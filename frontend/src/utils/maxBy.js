// @flow strict

const maxBy = <T>(list: T[], getValue: (T) => number): T => {
	if (list.length === 0) {
		throw new Error('Cannot calculate max of empty list')
	}
	let max = list[0]
	let maxValue = getValue(list[0])
	for (const currentElement of list) {
		const currentValue = getValue(currentElement)
		if (maxValue < currentValue) {
			max = currentElement
			maxValue = currentValue
		}
	}
	return max
}

export default maxBy
