// @flow strict
import TC from '@teamcity/react-api'
import type {
	FetchedBuildTypeInvestigation,
	FetchedInvestigation,
	FetchedInvestigations,
	FetchedProblemInvestigation,
	FetchedTestInvestigation,
} from './types'
import type {
	Investigation,
	InvestigationId,
	InvestigationState,
} from '../../store/slices/investigationsSlice'
import requestProblemOccurrence from '../problemOccurrences/requestProblemOccurrence'
import type { UserId } from '../../commontypes'
import requestTestOccurrences from '../testOccurrences/requestTestOccurrences'
import maxBy from '../../utils/maxBy'
import type { Build } from '../build/schemata'
import { userFields } from '../user/schemata'
import { parseTimestamp } from '../../utils/parseTimestamp'

const parseInvestigationCommonFields = (
	investigation: FetchedInvestigation
): {
	id: InvestigationId,
	state: InvestigationState,
	date: string,
	assignedBy: {
		id: UserId,
		username: string,
		name?: string,
		...
	},
	...
} => {
	return {
		id: investigation.id,
		state: investigation.state,
		date: parseTimestamp(investigation.assignment.timestamp).toUTCString(),
		assignedBy: {
			id: investigation.assignment.user.id,
			name: investigation.assignment.user.name,
			username: investigation.assignment.user.username,
		},
	}
}

const parseFetchedBuildTypeInvestigation = (
	investigation: FetchedBuildTypeInvestigation
): Investigation => {
	return {
		...parseInvestigationCommonFields(investigation),
		projectId: investigation.scope.buildTypes.buildType[0].projectId,
		// TODO: fix this, add another type definition
		projectFullName:
			investigation.scope.buildTypes.buildType[0].projectName,
		defaultBranch: true,
		target: {
			type: 'buildType',
			id: investigation.scope.buildTypes.buildType[0].id,
			name: investigation.scope.buildTypes.buildType[0].name,
			buildIds: [], // none
			webUrl: investigation.scope.buildTypes.buildType[0].webUrl,
		},
	}
}

const parseFetchedTestInvestigation = (
	investigation: FetchedTestInvestigation
): Investigation => {
	return {
		...parseInvestigationCommonFields(investigation),
		projectId: investigation.scope.project.id,
		projectFullName: `${investigation.scope.project.parentProjectName} / ${investigation.scope.project.name}`,
		defaultBranch: false,
		target: {
			type: 'test',
			id: investigation.target.tests.test[0].id,
			name:
				investigation.target.tests.test[0].parsedTestName.testShortName,
			buildIds: [], // to be added later by addTestOccurrencesFieldsToTestInvestigation
			webUrl: '', // to be added later by addTestOccurrencesFieldsToTestInvestigation
		},
	}
}

const parseFetchedProblemInvestigation = (
	investigation: FetchedProblemInvestigation
): Investigation => {
	return {
		...parseInvestigationCommonFields(investigation),
		projectId: investigation.scope.project.id,
		projectFullName: `${investigation.scope.project.parentProjectName} / ${investigation.scope.project.name}`,
		defaultBranch: false,
		target: {
			type: 'problem',
			id: investigation.target.problems.problem[0].id,
			name: 'Problem names are not implemented yet :c',
			buildIds: [], // to be added later by addProblemOccurrenceFieldsToProblemInvestigation
			webUrl: '', // to be added later by addProblemOccurrenceFieldsToProblemInvestigation
		},
	}
}

const addProblemOccurrenceFieldsToProblemInvestigation = async (
	investigation: Investigation
) => {
	const problemId = investigation.target.id
	const problemOccurrence = await requestProblemOccurrence(problemId)
	investigation.target.name = problemOccurrence.details
	investigation.target.buildIds = [problemOccurrence.build.id]
	investigation.target.webUrl = problemOccurrence.build.webUrl
	investigation.defaultBranch = problemOccurrence.build.defaultBranch ?? true
}

const addTestOccurrencesFieldsToTestInvestigation = async (
	investigation: Investigation
) => {
	const testId = investigation.target.id
	const testOccurrences = await requestTestOccurrences(testId)
	const testBuilds: Build[] = testOccurrences.map(
		(testOccurrence) => testOccurrence.build
	)
	investigation.target.buildIds = testBuilds.map((build) => build.id)
	investigation.target.webUrl = maxBy(testBuilds, (build) =>
		parseTimestamp(build.finishDate).getTime()
	).webUrl
	investigation.defaultBranch = testBuilds.some(
		(build) => (build.defaultBranch ?? true) === true
	)
}

// TODO: many things are marked with $FlowFixMe because i'm unsure how the received data looks
const parseFetchedInvestigation = (
	investigation: FetchedInvestigation
): ?Investigation => {
	try {
		if (investigation.target.anyProblem === true) {
			// $FlowFixMe
			return parseFetchedBuildTypeInvestigation(investigation)
		} else if (
			investigation.target.tests !== undefined &&
			investigation.target.tests !== null
		) {
			// $FlowFixMe
			return parseFetchedTestInvestigation(investigation)
		} else if (
			investigation.target.problems !== undefined &&
			investigation.target.problems !== null
		) {
			// $FlowFixMe
			return parseFetchedProblemInvestigation(investigation)
		}
	} catch (error) {
		console.error(
			`Error was thrown during fetched investigation parsing`,
			error
		)
	}
}

const fetchInvestigationsByAssignee = async (
	userId: UserId
): Promise<Investigation[]> => {
	const json: FetchedInvestigations = await TC.requestJSON(
		`app/rest/investigations?locator=assignee:(id:${userId})&fields=investigation(id,state,scope(buildTypes(buildType(id,name,projectName,projectId,webUrl)),project(id,name,parentProjectName)),target(anyProblem,tests(test(id,parsedTestName(testShortName))),problems(problem)),assignment(timestamp,user(${userFields})))`
	)
	const investigations: Investigation[] = json.investigation
		.map((investigation: FetchedInvestigation) =>
			// $FlowFixMe
			parseFetchedInvestigation(investigation)
		)
		.filter(
			(investigation) =>
				investigation !== undefined && investigation !== null
		)
	await Promise.all(
		investigations
			.filter((investigation) => investigation.target.type === 'problem')
			.map((investigation) =>
				addProblemOccurrenceFieldsToProblemInvestigation(investigation)
			)
	)
	await Promise.all(
		investigations
			.filter((investigation) => investigation.target.type === 'test')
			.map((investigation) =>
				addTestOccurrencesFieldsToTestInvestigation(investigation)
			)
	)
	return investigations
}

export default fetchInvestigationsByAssignee
