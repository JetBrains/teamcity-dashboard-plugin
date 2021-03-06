// @flow strict
import {
	createEntityAdapter,
	createSelector,
	createSlice,
	nanoid,
} from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import type {
	AbstractWidgetData,
	SetWidgetPropertyActionPayload,
	WidgetData, WidgetDataData,
	WidgetId,
	WidgetsState,
	WidgetType,
} from './widgets.types'
import {
	closeWidgetSettings,
	HIDDEN_SETTINGS_WIDGET_ID,
	openWidgetSettings,
} from './widgetSettings.slice'
import { copyWidget, makeHiddenSettingsWidget } from './widgetSettings.utils'
import { filterVisibleWidgetIds } from './widgets.utils'
import type { OpenWidgetSettingsPayload } from './widgetSettings.types'
import type { Json, PayloadAction } from '../../commontypes'
import { type Dispatch } from 'redux'
import { fetchDashboardData } from '../dashboard/fetchingDashboardData.slice'
import { isWidgetTypeSupported } from './config/widgetProperties.helpers'
import { ThunkAction } from 'redux-thunk'
import deepCopyJson from '../../utils/deepCopyJson'

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
		setWidgetOption: <T: Json>(
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
		addWidget: {
			reducer: (
				state: WidgetsState,
				action: PayloadAction<WidgetData>
			) => {
				widgetsAdapter.upsertOne(state, action.payload)
			},
			prepare: <Type : WidgetType>(
				type: Type,
				data?: WidgetDataData = {}
			): {| payload: AbstractWidgetData<Type, *> |} => ({
				payload: ({
					id: nanoid(),
					type: type,
					data: data ? deepCopyJson(data) : {},
				}),
			}),
		},
		saveWidgetSettings: (
			state: WidgetsState,
			action: PayloadAction<WidgetId>
		) => {
			const id = action.payload
			const hiddenSettingsWidget =
				state.entities[HIDDEN_SETTINGS_WIDGET_ID]
			widgetsAdapter.upsertOne(
				state,
				copyWidget(hiddenSettingsWidget, id)
			)
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDashboardData.fulfilled, (state, action) => {
			widgetsAdapter.upsertMany(state, action.payload.widgets)
		})
		builder.addCase(
			openWidgetSettings,
			(
				state: WidgetsState,
				action: PayloadAction<OpenWidgetSettingsPayload>
			) => {
				const { isNew, type } = action.payload
				const widget: AbstractWidgetData<WidgetType, WidgetDataData> =
					isNew ||
					action.payload.id === null ||
					action.payload.id === undefined
						? {id: 'any', type: type, data: {}}
						: state.entities[action.payload.id]
				widgetsAdapter.upsertOne(
					state,
					makeHiddenSettingsWidget(widget)
				)
			}
		)
		builder.addCase(closeWidgetSettings, (state: WidgetsState) => {
			widgetsAdapter.removeOne(state, HIDDEN_SETTINGS_WIDGET_ID)
		})
	},
})

// Actions
export const addWidget: (
	type: WidgetType,
	data?: $PropertyType<WidgetData, 'data'>
) => PayloadAction<WidgetData> = widgetsSlice.actions.addWidget

export const addWidgetFromSettings = () => (
	dispatch: Dispatch<*>,
	getState: () => RootState
) => {
	const state: RootState = getState()
	const widget = selectHiddenSettingsWidget(state)
	if (widget) {
		const { type, data } = widget
		dispatch(addWidget(type, data))
	}
}

export const saveWidgetSettings: (WidgetId) => PayloadAction<WidgetId> =
	widgetsSlice.actions.saveWidgetSettings

export const removeWidget: (WidgetId) => void =
	widgetsSlice.actions.removeWidget

export const setWidgetOption = <T>(
	id: WidgetId,
	propertyName: string,
	propertyValue: T
) => widgetsSlice.actions.setWidgetOption({ id, propertyName, propertyValue })

export const cloneWidget = (widgetId: WidgetId): ThunkAction => (
	dispatch: Dispatch<*>,
	getState: () => RootState
) => {
	const widget = selectWidgetById(getState(), widgetId)
	if (widget) {
		dispatch(addWidget(widget.type, widget.data))
	}
}

// Selectors
const selectors = widgetsAdapter.getSelectors((state) => state.widgets)
export const selectAllWidgets: (RootState) => WidgetData[] = selectors.selectAll
const selectAllWidgetIds: (RootState) => WidgetId[] = selectors.selectIds
export const selectWidgetById: (RootState, WidgetId) => ?WidgetData =
	selectors.selectById

export const selectAllVisibleWidgetIds: (RootState) => WidgetId[] = createSelector(
	selectAllWidgetIds,
	filterVisibleWidgetIds
)

export const selectHiddenSettingsWidget = (state: RootState): ?WidgetData =>
	selectWidgetById(state, HIDDEN_SETTINGS_WIDGET_ID)

export const selectWidgetDataType: (
	RootState,
	WidgetId
) => ?WidgetType = createSelector(selectWidgetById, (widget: WidgetData) => {
	const type = widget?.type
	if (type !== undefined && type !== null && isWidgetTypeSupported(type)) {
		return type
	}
})

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
