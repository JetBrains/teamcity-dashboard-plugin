// @flow strict
import React, { useMemo } from 'react'

interface Properties {
	date: Date | string;
}

const monthNames = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
]

const formatMinutes = (minutes: number): string => {
	if (minutes < 10) {
		return `0${minutes}`
	}
	return minutes.toString()
}

const FormattedDate = ({ date }: Properties) => {
	const actualDate = useMemo(
		() => (date instanceof Date ? date : new Date(date)),
		[date]
	)

	return (
		<span>
			{actualDate.getDate()} {monthNames[actualDate.getMonth()]}{' '}
			{actualDate.getFullYear()} {actualDate.getHours()}:
			{formatMinutes(actualDate.getMinutes())}
		</span>
	)
}

export default FormattedDate
