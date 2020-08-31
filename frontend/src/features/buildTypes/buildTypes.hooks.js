// @flow strict
import type { BuildType, BuildTypeId } from './buildTypes.types'

import TC from '@teamcity/react-api'
import type { FullPath } from '../projects/projects.types'

export const useBuildType: (BuildTypeId, ?boolean) => ?BuildType =
	TC.hooks.useBuildType

export const useSubscribeOnBuildTypeStatus: (BuildTypeId) => void =
	TC.hooks.useSubscribeOnBuildTypeStatus

export const usePathToBuildType: (BuildTypeId) => FullPath =
	TC.hooks.usePathToBuildType
