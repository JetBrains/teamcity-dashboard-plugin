// @flow strict
import { selectWidgetById } from '../slices/widgetsSlice'
import type { WidgetData } from '../slices/widgetsSlice'
import type { RootState } from '..'
import type { InvestigationsSortingOption } from '../../hooks/investigations/useInvestigationsSortedBy'
import { createSelector } from '@reduxjs/toolkit'

export const selectInvestigationsWidgetSortByOption: (
	RootState,
	widgetId: string
) => InvestigationsSortingOption = createSelector(
	selectWidgetById,
	(widget: ?WidgetData) => widget?.data?.sortBy ?? 'time'
)

export const selectInvestigationsWidgetShowFixedOption: (
	RootState,
	widgetId: string
) => boolean = createSelector(
	selectWidgetById,
	(widget: ?WidgetData) => widget?.data?.showFixed === 'true'
)
