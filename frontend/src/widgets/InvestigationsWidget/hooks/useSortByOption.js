// @flow strict

import type { InvestigationsWidgetSortByOption } from '../../../features/widgets/widgets.types'
import { useThisWidgetOption } from '../../../features/widgets/widgets.hooks'

const useSortByOption = (): [
	InvestigationsWidgetSortByOption,
	(InvestigationsWidgetSortByOption) => void
] => useThisWidgetOption('sortBy', 'time')

export default useSortByOption
