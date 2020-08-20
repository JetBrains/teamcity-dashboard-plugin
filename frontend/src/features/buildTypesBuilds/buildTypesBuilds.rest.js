// @flow strict
import TC from '@teamcity/react-api'
import type { BuildId } from '../builds/builds.types'
import type { BuildTypeId } from '../buildTypes/buildTypes.types'

type FetchedBuildTypeBuilds = {
	build: { id: BuildId, ... }[],
	...
}

export const requestBuildTypeBuilds = async (
	buildTypeId: BuildTypeId
): Promise<BuildId[]> => {
	const fetched: FetchedBuildTypeBuilds = await TC.requestJSON(
		`app/rest/buildTypes/id:${buildTypeId}/builds`
	)
	return fetched.build.map((build) => build.id)
}
