// @flow strict
import { useCallback } from 'react'
import useWidgetData from '../useWidgetData'

const useBooleanWidgetOption = (
	widgetId: string,
	propertyName: string,
	defaultValue: boolean
): [boolean, (boolean) => void] => {
	const [widgetData, setWidgetData] = useWidgetData(widgetId)
	const property: ?string = widgetData.data[propertyName]
	const value = property === null || property === undefined ? defaultValue : property === 'true'
	const setValue = useCallback(
		(newValue: boolean) =>
			setWidgetData({
				...widgetData,
				data: {
					...widgetData.data,
					[propertyName]: newValue ? 'true' : 'false',
				},
			}),
		[propertyName, setWidgetData, widgetData]
	)
	return [value, setValue]
}

export default useBooleanWidgetOption
