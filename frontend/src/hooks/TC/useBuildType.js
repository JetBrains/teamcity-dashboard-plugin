// @flow strict

import TC from '@teamcity/react-api'
import type { BuildType, BuildTypeId } from './schemata'

const useBuildType: (BuildTypeId) => ?BuildType = TC.hooks.useBuildType

export default useBuildType
