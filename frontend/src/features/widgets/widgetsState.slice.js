// @flow strict

import {
	createEntityAdapter,
	createSelector,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import type { WidgetId } from './widgets.types'
import type {
	SetWidgetPropertyActionPayload,
	WidgetStateEntity,
	WidgetStateState,
} from './widgetsState.types'
import type { Json } from '../../commontypes'

const adapter = createEntityAdapter()

// Selectors

const selectSlice = (state: RootState) => state.widgetsState

const selectors = adapter.getSelectors(selectSlice)

const selectWidgetStateEntityById: (RootState, WidgetId) => WidgetStateEntity =
	selectors.selectById

export const selectWidgetStateProperty: <T: Json>(
	propertyName: string,
	defaultValue: T
) => (RootState, WidgetId) => T = (propertyName, initialValue) =>
	createSelector(selectWidgetStateEntityById, (entity: ?WidgetStateEntity) =>
		entity?.state
			? entity.state[propertyName] ?? initialValue
			: initialValue
	)

// Slice

const widgetsStateSlice = createSlice<WidgetStateState>({
	name: 'widgetsState',
	initialState: adapter.getInitialState(),
	reducers: {
		setWidgetStateProperty: <T>(
			state: WidgetStateState,
			action: PayloadAction<SetWidgetPropertyActionPayload<T>>
		) => {
			const { id, propertyName, propertyValue } = action.payload
			if (
				state.entities[id] !== undefined &&
				state.entities[id] !== null
			) {
				state.entities[id].state[propertyName] = propertyValue
			} else {
				const entity: WidgetStateEntity = {
					id,
					state: {
						[propertyName]: propertyValue,
					},
				}
				adapter.upsertOne(state, entity)
			}
		},
	},
})

// Actions

export const setWidgetStateProperty = <T>(
	id: WidgetId,
	propertyName: string,
	propertyValue: T
) =>
	widgetsStateSlice.actions.setWidgetStateProperty({
		id,
		propertyName,
		propertyValue,
	})

// Reducer

export default widgetsStateSlice.reducer
