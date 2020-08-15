// @flow strict

import TC from '@teamcity/react-api'
import type { BuildType, BuildTypeId } from './schemata'

const useBuildType: (BuildTypeId, ?boolean) => ?BuildType =
	TC.hooks.useBuildType
export default useBuildType
