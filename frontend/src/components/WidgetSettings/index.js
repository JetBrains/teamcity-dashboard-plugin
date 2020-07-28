// @flow strict
import React from 'react'
import useWidgetData from '../../hooks/useWidgetData'

interface Properties {
	id: string;
}

const WidgetSettings = ({ id }: Properties) => {
	const [widgetData, setWidgetData] = useWidgetData(id)

	const updateValue = (newValue: string) =>
		setWidgetData({
			...widgetData,
			data: {
				...widgetData.data,
				value: newValue,
			},
		})

	return (
		widgetData.type === 'text' ? (
			<input
				type="text"
				value={widgetData.data.value}
				onChange={(event) => updateValue(event.target.value)}
			/>
		) : (<span>Settings for non-text widgets are not supported</span>)
	)
}

export default WidgetSettings
