// @flow strict
import type { User } from '../../api/user/schemata'
import type { ProjectId } from '../projects/projects.types'
import type { BuildTypeId } from '../buildTypes/buildTypes.types'
import type { UserId } from '../users/users.types'
import type { BuildId } from '../builds/builds.types'

export type InvestigationId = string

export type InvestigationState = 'TAKEN' | 'FIXED' | 'GIVEN_UP'

export type InvestigationTargetType = 'buildType' | 'test' | 'problem'

export type InvestigationResolutionType = 'whenFixed' | 'manually'

export type Investigation = {
	id: InvestigationId,
	state: InvestigationState,
	date: string, // the string that is returned by Date.prototype.toUTCString()
	projectId: ProjectId,
	projectFullName: string, // Actually a project-path-like string `Project A / Project B`
	assignedBy: User,
	defaultBranch: boolean,
	target: {
		name: string,
		buildIds: BuildId[],
		webUrl: string,
		...
	} & (
		| { type: 'buildType', id: BuildTypeId, ... }
		| { type: 'test' | 'problem', id: string, ... }
	),
	resolution: {
		type: InvestigationResolutionType,
		...
	},
	comment?: string,
	...
}

export interface InvestigationsState {
	ids: InvestigationId[];
	entities: {
		[id: InvestigationId]: Investigation,
		...
	};
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: ?string;
}

export type FetchInvestigationsArgument = {|
	userId: UserId,
	force?: boolean,
|}
