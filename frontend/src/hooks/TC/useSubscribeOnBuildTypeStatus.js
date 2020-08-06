// @flow strict
import TC from '@teamcity/react-api'
import type { BuildTypeId } from './schemata'

const useSubscribeOnBuildTypeStatus: (BuildTypeId) => void =
	TC.hooks.useSubscribeOnBuildTypeStatus

export default useSubscribeOnBuildTypeStatus
