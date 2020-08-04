// @flow strict
import { useCallback } from 'react'
import useWidgetData from '../../useWidgetData'

const useInvestigationsWidgetShowFixedOption = (
	widgetId: string
): [?boolean, (boolean) => void] => {
	const [widgetData, setWidgetData] = useWidgetData(widgetId)
	const showFixed = widgetData.data.showFixed
		? widgetData.data.showFixed === 'true'
		: undefined
	const setShowFixed = useCallback(
		(newShowFixed: boolean) =>
			setWidgetData({
				...widgetData,
				data: {
					...widgetData.data,
					showFixed: newShowFixed ? 'true' : 'false',
				},
			}),
		[setWidgetData, widgetData]
	)
	return [showFixed, setShowFixed]
}

export default useInvestigationsWidgetShowFixedOption
