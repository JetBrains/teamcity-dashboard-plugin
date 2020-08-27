// @flow strict
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { LayoutState } from './layout.types'
import { addWidget, removeWidget } from '../widgets/widgets.slice'
import type { WidgetData, WidgetId } from '../widgets/widgets.types'
import type { DashboardData } from './dashboard.types'
import { fetchDashboardData } from './fetchingDashboardData.slice'
import { getWidgetDimensionsProperties } from '../widgets/config/widgetProperties.helpers'

export const layoutSlice = createSlice<LayoutState>({
	name: 'layout',
	initialState: [],
	reducers: {
		setLayout: (state, action: PayloadAction<LayoutState>) =>
			action.payload,
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchDashboardData.fulfilled,
			(state, action: PayloadAction<DashboardData>) =>
				action.payload.layout
		)
		builder.addCase(
			addWidget,
			(state: LayoutState, action: PayloadAction<WidgetData>) => {
				const { id, type } = action.payload
				const {
					minHeight,
					minWidth,
					defaultHeight,
					defaultWidth,
				} = getWidgetDimensionsProperties(type)
				state.push({
					i: id,
					x: 5,
					y: Infinity,
					w: defaultWidth ?? 3,
					h: defaultHeight ?? 3,
					minW: minWidth,
					minH: minHeight,
				})
			}
		)
		builder.addCase(
			removeWidget,
			(state, action: PayloadAction<WidgetId>) =>
				state.filter((element) => element.id !== action.payload)
		)
	},
})

// Actions
export const setLayout: (LayoutState) => void = layoutSlice.actions.setLayout
// export const addLayoutElement = layoutSlice.actions.addLayoutElement

export default layoutSlice.reducer
