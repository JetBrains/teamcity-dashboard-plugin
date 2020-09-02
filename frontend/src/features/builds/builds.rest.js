// @flow strict
import TC from '@teamcity/react-api'
import type { BuildsLocator } from './builds.locator'
import { stringifyBuildsLocator } from './builds.locator'
import type { BuildTypeId } from '../buildTypes/buildTypes.types'
import type { UserId } from '../users/users.types'
import type { Build, BuildId, BuildState, BuildStatus } from './builds.types'
import type { ChangeId } from '../changes/changes.types'

type FetchedBuild = {
	id: BuildId,
	buildTypeId: BuildTypeId,
	status: BuildStatus,
	statusText: string,
	state: BuildState,
	branchName: string,
	user?: {
		id: UserId,
		...
	},
	number: string,
	personal: boolean,
	failedToStart?: boolean,
	canceledInfo?: mixed,
	changes: {
		count: number,
		change: { id: ChangeId, ... }[],
		...
	},
	...
}

type FetchedBuilds = {
	build: FetchedBuild[],
	...
}

export const buildFields =
	'id,buildTypeId,status,statusText,state,branchName,user(id),number,personal,failedToStart,canceledInfo,changes(count,change(id))'

const parseBuild = (fetchedBuild: FetchedBuild): Build => {
	const {
		id,
		buildTypeId,
		status,
		statusText,
		state,
		branchName,
		changes,
		personal,
		number,
		failedToStart,
		canceledInfo,
		user,
	} = fetchedBuild
	return {
		id,
		buildTypeId,
		status,
		statusText,
		state,
		branchName,
		personal,
		number,
		failedToStart,
		wasCanceled: canceledInfo !== null && canceledInfo !== undefined,
		userId: user?.id,
		changesCount: changes.count,
		changeIds: changes.change.map((change) => change.id),
	}
}

export const requestBuilds = async (
	buildLocator: BuildsLocator
): Promise<Build[]> => {
	const fetchedBuilds: FetchedBuilds = await TC.requestJSON(
		`app/rest/builds/?locator=${stringifyBuildsLocator(
			buildLocator
		)},state:any&fields=build(${buildFields})`
	)
	return fetchedBuilds.build.map((build) => parseBuild(build))
}
