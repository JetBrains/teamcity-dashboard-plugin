// @flow strict
import type { InvestigationsWidgetSortByOption } from '../../../features/widgets/widgets.types'
import { useWidgetOption } from '../../../features/widgets/widgets.hooks'

const useInvestigationsWidgetSortByOption = (
	widgetId: string
): [
	InvestigationsWidgetSortByOption,
	(InvestigationsWidgetSortByOption) => void
] => {
	return useWidgetOption(widgetId, 'sortBy', 'time')
}

export default useInvestigationsWidgetSortByOption
