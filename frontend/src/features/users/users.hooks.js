// @flow strict
import type { UserId } from '../../api/user/schemata'

import TC from '@teamcity/react-api'

export const useCurrentUserId: () => UserId = TC.hooks.useCurrentUserId
