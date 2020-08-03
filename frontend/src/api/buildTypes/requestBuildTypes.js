// @flow strict
import type { BuildType } from '../../store/slices/buildTypesSlice'
import TC from '@teamcity/react-api'

type FetchedBuildTypes = {
	count: number,
	href: string,
	buildType: BuildType[],
	...
}

const requestBuildTypes = async (): Promise<BuildType[]> => {
	const json: FetchedBuildTypes = await TC.requestJSON('app/rest/buildTypes?fields=buildType(id,internalId,name,projectId,projectName,href,webUrl)')
	return json.buildType
}
export default requestBuildTypes
