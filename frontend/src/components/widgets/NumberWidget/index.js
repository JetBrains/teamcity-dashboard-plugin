// @flow strict
import React from 'react'

interface Properties {
	value: string;
	setValue: (newValue: string) => void;
}

const NumberWidget = ({ value, setValue }: Properties) => {
	return (
		<input
			type="number"
			value={value}
			style={{ width: '100%' }}
			onChange={(event) => setValue(event.target.value)}
		/>
	)
}

export default NumberWidget
