// @flow strict

const limitCount = (actualCount: number): string =>
	actualCount < 100 ? `${actualCount}` : `100+`

export default limitCount
