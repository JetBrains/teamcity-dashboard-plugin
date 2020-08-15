// @flow strict
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectFilteredInvestigationsCount } from '../../store/slices/investigationsSlice'
import type { WidgetId } from '../../features/widgets/widgets.types'

const useFilteredInvestigationsCount = (widgetId: WidgetId): number => {
	const selector = useMemo(
		() => selectFilteredInvestigationsCount(widgetId),
		[widgetId]
	)

	return useSelector(selector)
}

export default useFilteredInvestigationsCount
