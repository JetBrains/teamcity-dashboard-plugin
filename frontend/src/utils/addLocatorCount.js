// @flow strict

const addLocatorCount = (locator: string, count: number): string =>
	locator === '' ? `count:${count}` : `${locator},count:${count}`

export default addLocatorCount
