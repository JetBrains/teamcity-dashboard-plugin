// @flow strict
import TC from '@teamcity/react-api'
import type { UserId } from '../../api/user/schemata'

const useInvestigationsCounterOnUpdate: (UserId, onUpdate: () => void) => void =
	TC.hooks.useInvestigationsCounterOnUpdate

export default useInvestigationsCounterOnUpdate
