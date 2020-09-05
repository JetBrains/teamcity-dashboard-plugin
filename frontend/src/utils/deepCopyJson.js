// @flow strict

import type { Json } from '../commontypes'

const deepCopyJson = <T : Json>(json: T): T => {
	const maybeString = JSON.stringify(json)
	return maybeString !== undefined && maybeString !== null
		? JSON.parse(maybeString)
		: maybeString
}

export default deepCopyJson
