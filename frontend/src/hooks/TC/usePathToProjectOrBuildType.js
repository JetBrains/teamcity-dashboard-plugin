// @flow strict
import TC from '@teamcity/react-api'
import type { BuildTypeId, ProjectId } from './schemata'

export type ProjectOrBuildTypeNode = {
	name?: string,
	...
}

export type FullPath = Array<ProjectOrBuildTypeNode>

const usePathToProjectOrBuildType: (
	type: 'project' | 'buildType',
	id: ProjectId | BuildTypeId
) => FullPath = TC.hooks.usePathToProjectOrBuildType

export default usePathToProjectOrBuildType
