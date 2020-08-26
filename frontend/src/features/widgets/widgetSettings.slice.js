// @flow strict

import { createSelector, createSlice } from '@reduxjs/toolkit'
import type {
	SaveWidgetSettingsActionPayload,
	StartAddingNewWidgetPayload,
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
		isWidgetNew: false,
	},
	reducers: {
		openWidgetSettings: (
			state: WidgetSettingsState,
			action: PayloadAction<WidgetId>
		) => {
			const id = action.payload
			state.areSettingsOpened = true
			state.widgetId = id
			state.isWidgetNew = false
		},
		startAddingNewWidget: {
			reducer: (
				state: WidgetSettingsState,
				action: PayloadAction<StartAddingNewWidgetPayload>
			) => {
				const shouldOpenSettings = action.payload.openSettings
				if (shouldOpenSettings) {
					state.widgetId = undefined
					state.areSettingsOpened = true
					state.isWidgetNew = true
				}
			},
			prepare: (type: WidgetType, openSettings?: boolean = true) => ({
				payload: {
					type,
					openSettings,
				},
			}),
		},
		// startAddingNewWidget: (state: WidgetSettingsState) => {
		// 	state.widgetId = undefined
		// 	state.areSettingsOpened = true
		// 	state.isWidgetNew = true
		// },
		cancelWidgetSettings: (state: WidgetSettingsState) => {
			state.areSettingsOpened = false
			state.widgetId = undefined
			state.isWidgetNew = false
		},
		saveWidgetSettings: (state: WidgetSettingsState) => {
			state.areSettingsOpened = false
			state.widgetId = undefined
			state.isWidgetNew = false
		},
	},
})

// Actions

export const openWidgetSettings: (WidgetId) => PayloadAction<WidgetId> =
	widgetSettingsSlice.actions.openWidgetSettings

export const startAddingNewWidget: (
	WidgetType,
	?boolean
) => PayloadAction<WidgetType> =
	widgetSettingsSlice.actions.startAddingNewWidget

export const cancelWidgetSettings: () => PayloadAction<void> =
	widgetSettingsSlice.actions.cancelWidgetSettings

export const saveWidgetSettings: (SaveWidgetSettingsActionPayload) => PayloadAction<SaveWidgetSettingsActionPayload> =
	widgetSettingsSlice.actions.saveWidgetSettings

// Reducers

export default widgetSettingsSlice.reducer
