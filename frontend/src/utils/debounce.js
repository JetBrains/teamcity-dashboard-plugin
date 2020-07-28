// @flow strict
const debounce = <T>(
	fn: (arg: T) => void,
	delay: number
): ((arg: T) => void) => {
	let timeoutId: ?number
	return (argument: T) => {
		if (timeoutId !== null && timeoutId !== undefined) {
			window.clearTimeout(timeoutId)
		}
		timeoutId = window.setTimeout(() => {
			fn(argument)
		}, delay)
	}
}

export default debounce
