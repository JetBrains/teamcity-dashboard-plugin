// @flow strict
import { useCallback } from 'react'
import type { InvestigationsWidgetSortByOption } from '../../../store/slices/widgetsSlice'
import useWidgetData from '../../useWidgetData'

const useInvestigationsWidgetSortByOption = (
	widgetId: string
): [
	?InvestigationsWidgetSortByOption,
	(InvestigationsWidgetSortByOption) => void
] => {
	const [widgetData, setWidgetData] = useWidgetData(widgetId)
	const sortBy = widgetData.data.sortBy
	const setSortBy = useCallback(
		(newSortBy: InvestigationsWidgetSortByOption) =>
			setWidgetData({
				...widgetData,
				data: {
					...widgetData.data,
					sortBy: newSortBy,
				},
			}),
		[widgetData, setWidgetData]
	)

	return [sortBy, setSortBy]
}

export default useInvestigationsWidgetSortByOption
