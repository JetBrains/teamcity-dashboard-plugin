// @flow strict
import type { BuildTypeId } from '../buildTypes/buildTypes.types'
import type { UserId } from '../users/users.types'

export type BuildId = number

export type BuildStatus =
	| 'UNKNOWN'
	| 'SUCCESS'
	| 'WARNING'
	| 'FAILURE'
	| 'ERROR'

export type BuildStatusType = 'canceled' | 'failure' | 'queued' | 'success'

export type BuildState =
	| 'queued'
	| 'running'
	| 'finished'
	| 'deleted'
	| 'unknown'

export type Build = {
	id: BuildId,
	buildType: BuildTypeId,
	status: BuildStatus,
	statusText: string,
	state: BuildState,
	branchName: string,
	changesCount: number,
	number: string,
	userId?: UserId,
	+queuedDate?: string,
	+startDate?: string,
	+finishDate?: string,
	+agent?: {
		id: number,
		...
	},
	+composite?: boolean,
	...
}
