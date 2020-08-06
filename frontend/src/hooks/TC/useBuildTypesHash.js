// @flow strict
import type { BuildTypesHash } from './schemata'
import TC from '@teamcity/react-api'

const useBuildTypesHash: () => BuildTypesHash = TC.hooks.useBuildTypesHash

export default useBuildTypesHash
