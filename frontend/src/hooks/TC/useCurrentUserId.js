// @flow strict

import TC from '@teamcity/react-api'
import type { UserId } from '../../api/user/schemata'

const useCurrentUserId: () => UserId = TC.hooks.useCurrentUserId

export default useCurrentUserId
