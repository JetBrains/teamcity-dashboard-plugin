// @flow strict

import {
	createEntityAdapter,
	createSelector,
	createSlice,
} from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import type {
	WidgetDimensionsEntity,
	WidgetsDimensionsState,
} from './widgetsDimensions.types'
import type { WidgetId, WidgetType } from './widgets.types'
import type { PayloadAction } from '../../commontypes'
import { selectWidgetDataType } from './widgets.slice'
import type { BreakpointName } from './config/widgetProperties.types'
import {
	getWidgetBreakpointsNotGreaterThan,
	getWidgetCurrentBreakpoint,
} from './config/widgetProperties.helpers'

const adapter = createEntityAdapter()

// Selectors

const selectWidgetsDimensionsSlice = (
	state: RootState
): WidgetsDimensionsState => state.widgetsDimensions

const selectors = adapter.getSelectors(selectWidgetsDimensionsSlice)

export const selectWidgetDimensionsById: (
	RootState,
	WidgetId
) => ?WidgetDimensionsEntity = selectors.selectById

export const selectWidgetWidth: (
	RootState,
	WidgetId
) => ?number = createSelector(
	selectWidgetDimensionsById,
	(dimensions: ?WidgetDimensionsEntity) => dimensions?.width
)

const selectWidgetCurrentBreakpoint: (
	RootState,
	WidgetId
) => ?BreakpointName = createSelector(
	selectWidgetWidth,
	selectWidgetDataType,
	(width: ?number, type: ?WidgetType): ?BreakpointName =>
		width !== null &&
		width !== undefined &&
		type !== null &&
		type !== undefined
			? getWidgetCurrentBreakpoint(type, width)
			: undefined
)

export const selectWidgetActiveBreakpoints = (
	widgetId: WidgetId
): ((RootState) => BreakpointName[]) =>
	createSelector(
		(state) => selectWidgetCurrentBreakpoint(state, widgetId),
		(state) => selectWidgetDataType(state, widgetId),
		(currentBreakpoint: ?BreakpointName, type: ?WidgetType) =>
			currentBreakpoint !== null &&
			currentBreakpoint !== undefined &&
			type !== null &&
			type !== undefined
				? getWidgetBreakpointsNotGreaterThan(type, currentBreakpoint)
				: []
	)

const widgetsDimensionsSlice = createSlice({
	name: 'widgetsDimensions',
	initialState: adapter.getInitialState(),
	reducers: {
		setWidgetDimensions: {
			reducer: (
				state: WidgetsDimensionsState,
				action: PayloadAction<WidgetDimensionsEntity>
			) => {
				adapter.upsertOne(state, action.payload)
			},
			prepare: (
				id: WidgetId,
				width: ?number
			): {| payload: WidgetDimensionsEntity |} => ({
				payload: {
					id,
					width,
				},
			}),
		},
	},
})

// Actions

export const setWidgetDimensions: (
	WidgetId,
	width: ?number
) => PayloadAction<WidgetDimensionsEntity> =
	widgetsDimensionsSlice.actions.setWidgetDimensions

// Reducer

export default widgetsDimensionsSlice.reducer
