// @flow strict
import {
	createEntityAdapter,
	createSelector,
	createSlice,
	nanoid,
} from '@reduxjs/toolkit'
import { fetchDashboardData } from '../../store/slices/fetchingDashboardData'
import type { RootState } from '../../store'
import type {
	SetWidgetPropertyActionPayload,
	WidgetData,
	WidgetDataWithoutId,
	WidgetId,
	WidgetsState,
	WidgetType,
} from './widgets.types'
import {
	cancelWidgetSettings,
	HIDDEN_SETTINGS_WIDGET_ID,
	openWidgetSettings,
	saveWidgetSettings,
	startAddingNewWidget,
} from './widgetSettings.slice'
import { copyWidget, makeHiddenSettingsWidget } from './widgetSettings.utils'
import { createEmptyWidgetData, filterVisibleWidgetIds } from './widgets.utils'
import type { SaveWidgetSettingsActionPayload, StartAddingNewWidgetPayload } from './widgetSettings.types'
import type { PayloadAction } from '../../commontypes'

const widgetsAdapter = createEntityAdapter<WidgetData>()

const widgetsSlice = createSlice<WidgetsState>({
	name: 'widgets',
	initialState: widgetsAdapter.getInitialState({
		widgetWithOpenedSettings: undefined,
	}),
	reducers: {
		updateWidget: (state, action: PayloadAction<WidgetData>) => {
			widgetsAdapter.upsertOne(state, action.payload)
		},
		addWidgetWithId: (state, action: PayloadAction<WidgetData>) => {
			widgetsAdapter.addOne(state, action.payload)
		},
		removeWidget: (state, action: PayloadAction<WidgetId>) => {
			widgetsAdapter.removeOne(state, action.payload)
			if (state.widgetWithOpenedSettings === action.payload) {
				state.widgetWithOpenedSettings = undefined
			}
		},
		setWidgetOption: <T>(
			state: WidgetsState,
			action: PayloadAction<SetWidgetPropertyActionPayload<T>>
		) => {
			const { id, propertyName, propertyValue } = action.payload
			if (
				state.entities[id] !== undefined &&
				state.entities[id] !== null
			) {
				state.entities[id].data[propertyName] = propertyValue
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDashboardData.fulfilled, (state, action) => {
			widgetsAdapter.upsertMany(state, action.payload.widgets)
		})
		builder.addCase(
			openWidgetSettings,
			(state: WidgetsState, action: PayloadAction<WidgetId>) => {
				const id = action.payload
				const widget = state.entities[id]
				widgetsAdapter.upsertOne(
					state,
					makeHiddenSettingsWidget(widget)
				)
			}
		)
		builder.addCase(
			startAddingNewWidget,
			(state: WidgetsState, action: PayloadAction<StartAddingNewWidgetPayload>) => {
				const { openSettings } = action.payload
				const type: WidgetType = action.payload.type
				const id = openSettings ? HIDDEN_SETTINGS_WIDGET_ID : nanoid()
				const emptyWidget = createEmptyWidgetData(id, type)
				widgetsAdapter.upsertOne(state, emptyWidget)
			}
		)
		builder.addCase(cancelWidgetSettings, (state: WidgetsState) => {
			widgetsAdapter.removeOne(state, HIDDEN_SETTINGS_WIDGET_ID)
		})
		builder.addCase(
			saveWidgetSettings,
			(
				state: WidgetsState,
				action: PayloadAction<SaveWidgetSettingsActionPayload>
			) => {
				const { id, isNew } = action.payload
				const actualId = isNew ? nanoid() : id ?? nanoid()
				const hiddenSettingsWidget =
					state.entities[HIDDEN_SETTINGS_WIDGET_ID]
				widgetsAdapter.upsertOne(
					state,
					copyWidget(hiddenSettingsWidget, actualId)
				)
				widgetsAdapter.removeOne(state, HIDDEN_SETTINGS_WIDGET_ID)
			}
		)
	},
})

// Actions
export const addWidget = (data: WidgetDataWithoutId) => {
	const id = nanoid()
	const widgetData: WidgetData = {
		...data,
		id,
	}
	return widgetsSlice.actions.addWidgetWithId(widgetData)
}

export const updateWidget: (WidgetData) => void =
	widgetsSlice.actions.updateWidget

export const addWidgetWithId: (WidgetData) => void =
	widgetsSlice.actions.addWidgetWithId

export const removeWidget: (WidgetId) => void =
	widgetsSlice.actions.removeWidget

export const setWidgetOption = <T>(
	id: WidgetId,
	propertyName: string,
	propertyValue: T
) => widgetsSlice.actions.setWidgetOption({ id, propertyName, propertyValue })

// Selectors
const selectors = widgetsAdapter.getSelectors((state) => state.widgets)
export const selectAllWidgets: (RootState) => WidgetData[] = selectors.selectAll
const selectAllWidgetIds: (RootState) => WidgetId[] = selectors.selectIds
export const selectWidgetById: (RootState, WidgetId) => WidgetData =
	selectors.selectById

export const selectAllVisibleWidgetIds: (RootState) => WidgetId[] = createSelector(
	selectAllWidgetIds,
	filterVisibleWidgetIds
)

export const selectHiddenSettingsWidget = (state: RootState): ?WidgetData =>
	selectWidgetById(state, HIDDEN_SETTINGS_WIDGET_ID)

export const selectWidgetDataType: (
	RootState,
	widgetId: string
) => ?$PropertyType<WidgetData, 'type'> = createSelector(
	selectWidgetById,
	(widget: WidgetData) => (widget ? widget.type : undefined)
)

export const selectAllDistinctWidgetTypes: (RootState) => WidgetType[] = createSelector(
	selectAllWidgets,
	(widgets: WidgetData[]) => {
		const types = widgets.map((widget) => widget.type)
		return [...new Set(types)]
	}
)

// Widget Options

export const selectWidgetOption: <T>(
	optionName: string,
	defaultValue: T
) => (RootState, WidgetId) => T = (optionName, defaultValue) =>
	createSelector(selectWidgetById, (widget: ?WidgetData) =>
		widget?.data ? widget.data[optionName] ?? defaultValue : defaultValue
	)

// Investigations Widget

export default widgetsSlice.reducer
