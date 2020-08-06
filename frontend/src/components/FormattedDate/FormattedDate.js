// @flow strict
import React from 'react'

interface Properties {
	date: Date;
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
	return (
		<span>
			{date.getDate()} {monthNames[date.getMonth()]} {date.getFullYear()}{' '}
			{date.getHours()}:{formatMinutes(date.getMinutes())}
		</span>
	)
}

export default FormattedDate
