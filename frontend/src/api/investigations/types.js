// @flow strict
import type { BuildType, ProjectId } from '../../hooks/TC/schemata'

export interface User {
	username: string;
	id: number;
	href: string;
}

export interface Assignment {
	timestamp: string;
	text: string;
	user: User;
}

export type InvestigationId = string

type FetchedInvestigationCommonFields = {
	id: InvestigationId,
	state: 'TAKEN' | 'FIXED' | 'GIVEN_UP',
	assignment: {
		timestamp: string,
		user: {
			id: number,
			username: string,
			name?: string,
			...
		},
		...
	},
	...
}

export type FetchedBuildTypeInvestigation = FetchedInvestigationCommonFields & {
	target: {
		anyProblem: true,
		...
	},
	scope: {
		buildTypes: {
			buildType: BuildType[],
			...
		},
		...
	},
	...
}

export type FetchedTestInvestigation = FetchedInvestigationCommonFields & {
	scope: {
		project: {
			id: ProjectId,
			name: string,
			parentProjectName: string,
			...
		},
		...
	},
	target: {
		anyProblem: false,
		tests: {
			test: {
				id: string,
				parsedTestName: { testShortName: string, ... },
				...
			}[],
			...
		},
		...
	},
	...
}

export type FetchedProblemInvestigation = FetchedInvestigationCommonFields & {
	scope: {
		project: {
			id: ProjectId,
			name: string,
			parentProjectName: string,
			...
		},
		...
	},
	target: {
		anyProblem: false,
		problems: {
			problem: { id: string, ... }[],
			...
		},
		...
	},
	...
}

export type FetchedInvestigation =
	| FetchedBuildTypeInvestigation
	| FetchedTestInvestigation
	| FetchedProblemInvestigation

export interface FetchedInvestigations {
	count: number;
	href: string;
	investigation: FetchedInvestigation[];
}
