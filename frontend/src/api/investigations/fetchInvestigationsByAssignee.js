// @flow strict
import TC from '@teamcity/react-api'
import type {
	FetchedBuildTypeInvestigation,
	FetchedInvestigation,
	FetchedInvestigations,
	FetchedProblemInvestigation,
	FetchedTestInvestigation,
} from './types'
import type { Investigation } from '../../store/slices/investigationsSlice'

const parseTimestamp = (timestamp: string): string => {
	const beatifulTimestamp = `${timestamp.slice(0, 4)}-${timestamp.slice(
		4,
		6
	)}-${timestamp.slice(6, 8)}T${timestamp.slice(9, 11)}:${timestamp.slice(
		11,
		13
	)}:${timestamp.slice(13, 15)}+${timestamp.slice(16, 18)}:${timestamp.slice(
		18,
		20
	)}`
	return new Date(beatifulTimestamp).toUTCString()
}

const parseFetchedBuildTypeInvestigation = (
	investigation: FetchedBuildTypeInvestigation
): Investigation => {
	return {
		id: investigation.id,
		state: investigation.state,
		date: parseTimestamp(investigation.assignment.timestamp),
		projectId: investigation.scope.buildTypes.buildType[0].projectId,
		projectFullName:
			investigation.scope.buildTypes.buildType[0].projectName,
		assignedBy: investigation.assignment.user.id,
		target: {
			type: 'buildType',
			id: investigation.scope.buildTypes.buildType[0].id,
			name: investigation.scope.buildTypes.buildType[0].name,
		},
	}
}

const parseFetchedTestInvestigation = (
	investigation: FetchedTestInvestigation
): Investigation => {
	return {
		id: investigation.id,
		state: investigation.state,
		date: parseTimestamp(investigation.assignment.timestamp),
		projectId: investigation.scope.project.id,
		projectFullName: `${investigation.scope.project.parentProjectName} / ${investigation.scope.project.name}`,
		assignedBy: investigation.assignment.user.id,
		target: {
			type: 'test',
			id: investigation.target.tests.test[0].id,
			name:
				investigation.target.tests.test[0].parsedTestName.testShortName,
		},
	}
}

const parseFetchedProblemInvestigation = (
	investigation: FetchedProblemInvestigation
): Investigation => {
	return {
		id: investigation.id,
		state: investigation.state,
		date: parseTimestamp(investigation.assignment.timestamp),
		projectId: investigation.scope.project.id,
		projectFullName: `${investigation.scope.project.parentProjectName} / ${investigation.scope.project.name}`,
		assignedBy: investigation.assignment.user.id,
		target: {
			type: 'problem',
			id: investigation.target.problems.problem[0].id,
			name: 'Problem names are not implemented yet :c',
		},
	}
}

const parseFetchedInvestigation = (
	investigation: FetchedInvestigation
): ?Investigation => {
	try {
		if (investigation.target.anyProblem === true) {
			return parseFetchedBuildTypeInvestigation(investigation)
		} else if (
			investigation.target.tests !== undefined &&
			investigation.target.tests !== null
		) {
			return parseFetchedTestInvestigation(investigation)
		} else if (
			investigation.target.problems !== undefined &&
			investigation.target.problems !== null
		) {
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
	username: string = 'admin'
): Promise<Investigation[]> => {
	const json: FetchedInvestigations = await TC.requestJSON(
		`app/rest/investigations?locator=assignee:(username:admin)&fields=investigation(id,state,scope(buildTypes(buildType(id,name,projectName,projectId)),project(id,name,parentProjectName)),target(anyProblem,tests(test(id,parsedTestName(testShortName))),problems(problem)),assignment(timestamp,user(id,username)))`
	)
	console.log('fetched json', json)
	return json.investigation
		.map((investigation: FetchedInvestigation) =>
			parseFetchedInvestigation(investigation)
		)
		.filter(
			(investigation) =>
				investigation !== undefined && investigation !== null
		)
}

export default fetchInvestigationsByAssignee
