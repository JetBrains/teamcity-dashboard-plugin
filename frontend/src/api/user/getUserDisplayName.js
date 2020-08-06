// @flow strict

import type { User } from './schemata'

const getUserDisplayName = (user: User): string =>
	user.name === null || user.name === undefined || user.name === ''
		? user.username
		: user.name

export default getUserDisplayName
