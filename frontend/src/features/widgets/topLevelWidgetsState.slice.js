// @flow strict

import type {
	SetTopLevelWidgetsStateActionPayload,
	TopLevelWidgetsStateState,
	TopLevelWidgetState,
} from './topLevelWidgetsState.types'
import type { Json, PayloadAction } from '../../commontypes'
import type { RootState } from '../../store'
import type { WidgetType } from './widgets.types'
import { createSelector, createSlice } from '@reduxjs/toolkit'

// Selectors

const selectTopLevelWidgetsStateSlice = (
	state: RootState
): TopLevelWidgetsStateState => state.topLevelWidgetsState

const selectTopLevelWidgetStateByType: (
	state: RootState,
	type: WidgetType | '$global'
) => ?TopLevelWidgetState = createSelector(
	selectTopLevelWidgetsStateSlice,
	(_, type) => type,
	(slice: TopLevelWidgetsStateState, type: WidgetType | '$global') =>
		slice[type]
)

export const selectTopLevelWidgetStateProperty: <T: Json>(
	propertyName: string,
	initialValue: T
) => (RootState, WidgetType | '$global') => T = (propertyName, initialValue) =>
	createSelector(
		selectTopLevelWidgetStateByType,
		(topLevelState: ?TopLevelWidgetState) =>
			topLevelState
				? topLevelState[propertyName] ?? initialValue
				: initialValue
	)

// Slice

const topLevelWidgetsStateSlice = createSlice<TopLevelWidgetsStateState>({
	name: 'topLeveWidgetsState',
	initialState: {
		$global: {},
	},
	reducers: {
		setTopLevelWidgetState: <T: Json>(
			state: TopLevelWidgetsStateState,
			action: PayloadAction<SetTopLevelWidgetsStateActionPayload<T>>
		) => {
			const { type, propertyName, propertyValue } = action.payload
			if (state[type] === undefined || state[type] === null) {
				state[type] = {}
			}
			state[type][propertyName] = propertyValue
		},
	},
})

// Actions

export const setTopLevelWidgetState = <T: Json>(
	type: WidgetType | '$global',
	propertyName: string,
	propertyValue: T
) =>
	topLevelWidgetsStateSlice.actions.setTopLevelWidgetState({
		type,
		propertyName,
		propertyValue,
	})

// Reducer

export default topLevelWidgetsStateSlice.reducer
