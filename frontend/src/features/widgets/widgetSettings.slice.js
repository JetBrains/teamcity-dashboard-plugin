// @flow strict

import { createSelector, createSlice } from '@reduxjs/toolkit'
import type {
	OpenWidgetSettingsPayload,
	WidgetSettingsState,
} from './widgetSettings.types'
import type { WidgetId, WidgetType } from './widgets.types'
import type { PayloadAction } from '../../commontypes'
import type { RootState } from '../../store'
import { makeHiddenWidgetId } from './widgets.utils'

export const HIDDEN_SETTINGS_WIDGET_ID = makeHiddenWidgetId('widgetSettings')

// Selectors

const selectWidgetSettingsSlice = (state: RootState) => state.widgetSettings

export const selectAreWidgetSettingsOpened: (RootState) => boolean = createSelector(
	selectWidgetSettingsSlice,
	(state: WidgetSettingsState) => state.areSettingsOpened
)

export const selectWidgetSettingsWidgetId: (RootState) => ?WidgetId = createSelector(
	selectWidgetSettingsSlice,
	(state: WidgetSettingsState) => state.widgetId
)

export const selectWidgetSettingsWidgetType: (RootState) => ?WidgetType = createSelector(
	selectWidgetSettingsSlice,
	(state: WidgetSettingsState) => state.widgetType
)

export const selectWidgetSettingsIsWidgetNew: (RootState) => boolean = createSelector(
	selectWidgetSettingsSlice,
	(state: WidgetSettingsState) => state.isWidgetNew
)

// Slice

const widgetSettingsSlice = createSlice<WidgetSettingsState>({
	name: 'widgetSettings',
	initialState: {
		areSettingsOpened: false,
		widgetId: undefined,
		widgetType: undefined,
		isWidgetNew: false,
	},
	reducers: {
		openWidgetSettings: (
			state: WidgetSettingsState,
			action: PayloadAction<OpenWidgetSettingsPayload>
		) => {
			const { isNew, type } = action.payload
			state.areSettingsOpened = true
			state.widgetType = type
			state.isWidgetNew = isNew
			if (
				isNew ||
				action.payload.id === null ||
				action.payload.id === undefined
			) {
				state.isWidgetNew = true
				state.widgetId = undefined
			} else {
				state.isWidgetNew = false
				state.widgetId = action.payload.id
			}
		},
		closeWidgetSettings: (state: WidgetSettingsState) => {
			state.areSettingsOpened = false
			state.widgetId = undefined
			state.widgetType = undefined
			state.isWidgetNew = false
		},
	},
})

// Actions

export const openWidgetSettings: (OpenWidgetSettingsPayload) => PayloadAction<WidgetId> =
	widgetSettingsSlice.actions.openWidgetSettings

export const closeWidgetSettings: () => PayloadAction<void> =
	widgetSettingsSlice.actions.closeWidgetSettings

// Reducers

export default widgetSettingsSlice.reducer
