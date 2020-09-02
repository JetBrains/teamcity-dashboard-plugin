// @flow strict

import {
	createEntityAdapter,
	createSelector,
	createSlice,
} from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import type { WidgetId } from './widgets.types'
import type { PayloadAction, ThunkAction } from '../../commontypes'
import { selectWidgetDataType } from './widgets.slice'
import type { BreakpointName } from './config/widgetProperties.types'
import {
	getWidgetBreakpointsNotGreaterThan,
	getWidgetCurrentBreakpoint,
} from './config/widgetProperties.helpers'
import type {
	WidgetBreakpointsEntity,
	WidgetsBreakpointsState,
} from './widgetsBreakpoints.types'

const adapter = createEntityAdapter()

const emptyArray = []

// Selectors

const selectWidgetsBreakpointsSlice = (
	state: RootState
): WidgetsBreakpointsState => state.widgetsBreakpoints

const selectors = adapter.getSelectors(selectWidgetsBreakpointsSlice)

const selectWidgetBreakpointsEntityById: (
	RootState,
	WidgetId
) => ?WidgetBreakpointsEntity = selectors.selectById

export const selectWidgetCurrentBreakpoint: (
	RootState,
	WidgetId
) => ?BreakpointName = createSelector(
	selectWidgetBreakpointsEntityById,
	(entity: ?WidgetBreakpointsEntity) => entity?.currentBreakpoint
)

export const selectWidgetActiveBreakpoints: (
	RootState,
	WidgetId
) => BreakpointName[] = createSelector(
	selectWidgetBreakpointsEntityById,
	(entity: ?WidgetBreakpointsEntity) =>
		entity?.activeBreakpoints ?? emptyArray
)

// Slice

const widgetsBreakpointsSlice = createSlice<WidgetsBreakpointsState>({
	name: 'widgetsBreakpoints',
	initialState: adapter.getInitialState(),
	reducers: {
		setWidgetWidth: (
			state: WidgetsBreakpointsState,
			action: PayloadAction<WidgetBreakpointsEntity>
		) => {
			adapter.upsertOne(state, action.payload)
		},
	},
})

// Actions

const setWidth: (WidgetBreakpointsEntity) => PayloadAction<WidgetBreakpointsEntity> =
	widgetsBreakpointsSlice.actions.setWidgetWidth

export const setWidgetWidth = (
	id: WidgetId,
	width: ?number
): ThunkAction<*> => (dispatch, getState) => {
	const state = getState()
	const type = selectWidgetDataType(state, id)
	const previousBreakpoint = selectWidgetCurrentBreakpoint(state, id)
	const currentBreakpoint =
		width !== null &&
		width !== undefined &&
		type !== null &&
		type !== undefined
			? getWidgetCurrentBreakpoint(type, width)
			: undefined
	if (previousBreakpoint !== currentBreakpoint) {
		const activeBreakpoints =
			currentBreakpoint !== null &&
			currentBreakpoint !== undefined &&
			type !== null &&
			type !== undefined
				? getWidgetBreakpointsNotGreaterThan(type, currentBreakpoint)
				: []

		dispatch(
			setWidth({
				id,
				currentBreakpoint,
				activeBreakpoints,
			})
		)
	}
}

// Reducer

export default widgetsBreakpointsSlice.reducer
