// @flow strict
import {
	createEntityAdapter,
	createSelector,
	createSlice,
	nanoid,
	PayloadAction,
} from '@reduxjs/toolkit'
import { fetchDashboardData } from '../../store/slices/fetchingDashboardData'
import type { RootState } from '../../store'
import type {
	SetWidgetPropertyActionPayload,
	WidgetData,
	WidgetDataWithoutId,
	WidgetId,
	WidgetOptions,
	WidgetsState,
	WidgetType,
} from './widgets.types'

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
		setWidgetStateProperty: <T>(
			state: WidgetsState,
			action: PayloadAction<SetWidgetPropertyActionPayload<T>>
		) => {
			const { id, propertyName, propertyValue } = action.payload
			if (state.entities[id] !== undefined) {
				state.entities[id].state[propertyName] = propertyValue
			}
		},
		openWidgetSettings: (
			state: WidgetsState,
			action: PayloadAction<WidgetId>
		) => {
			state.widgetWithOpenedSettings = action.payload
		},
		closeWidgetSettings: (state: WidgetsState) => {
			state.widgetWithOpenedSettings = undefined
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDashboardData.fulfilled, (state, action) => {
			widgetsAdapter.upsertMany(state, action.payload.widgets)
		})
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

export const openWidgetSettings: (WidgetId) => void =
	widgetsSlice.actions.openWidgetSettings

export const closeWidgetSettings: () => mixed =
	widgetsSlice.actions.closeWidgetSettings

// Selectors
const selectors = widgetsAdapter.getSelectors((state) => state.widgets)
export const selectAllWidgets: (RootState) => WidgetData[] = selectors.selectAll
export const selectAllWidgetIds: (RootState) => WidgetId[] = selectors.selectIds
export const selectWidgetById: (RootState, WidgetId) => WidgetData =
	selectors.selectById

export const selectWidgetWithOpenedSettings = (state: RootState) =>
	state.widgets.widgetWithOpenedSettings

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
