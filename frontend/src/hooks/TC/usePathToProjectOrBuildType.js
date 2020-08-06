// @flow strict
import TC from '@teamcity/react-api'
import type { BuildTypeId, ProjectId } from './schemata'

export type FullPath = mixed

const usePathToProjectOrBuildType: (
	type: 'project' | 'buildType',
	id: ProjectId | BuildTypeId
) => FullPath = TC.hooks.usePathToProjectOrBuildType

export default usePathToProjectOrBuildType
