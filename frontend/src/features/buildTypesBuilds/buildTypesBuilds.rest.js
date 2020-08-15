// @flow strict
import type { BuildId } from '../builds/builds.slice'
import type { BuildTypeId } from '../../hooks/TC/schemata'
import TC from '@teamcity/react-api'

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
