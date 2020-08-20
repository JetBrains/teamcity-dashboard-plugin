// @flow strict
import type { BuildType, BuildTypeId } from './buildTypes.types'

import TC from '@teamcity/react-api'

export const useBuildType: (BuildTypeId) => ?BuildType = TC.hooks.useBuildType

export const useSubscribeOnBuildTypeStatus: (BuildTypeId) => void =
	TC.hooks.useSubscribeOnBuildTypeStatus
