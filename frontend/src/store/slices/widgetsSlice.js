// @flow strict
import {
	createEntityAdapter,
	createSelector,
	createSlice,
	Dispatch,
	nanoid,
	PayloadAction,
	ThunkAction,
} from '@reduxjs/toolkit'
import { fetchDashboardData } from './fetchingDashboardData'
import { type Record } from '../../commontypes'
import type { RootState } from '..'

export type WidgetId = string

export type InvestigationsWidgetSortByOption = 'time' | 'name'

export type WidgetOptions = {|
	sortBy?: InvestigationsWidgetSortByOption,
	showFixed?: 'true' | 'false',
	showOnlyDefaultBranch?: 'true' | 'false',
|}

export type WidgetData = {
	id: string,
	type: 'investigationsWidget',
	data: WidgetOptions,
	...
}

export type WidgetType = $PropertyType<WidgetType, 'type'>

export type WidgetDataWithoutId = $Diff<WidgetData, {| id: string |}>

export interface WidgetsState {
	ids: string[];
	entities: Record<string, WidgetData>;
	widgetWithOpenedSettings: ?string;
}

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
export const addWidget = (data: WidgetDataWithoutId): ThunkAction => (
	dispatch: Dispatch
) => {
	const id = nanoid()
	const widgetData: WidgetData = {
		...data,
		id,
	}
	dispatch(widgetsSlice.actions.addWidgetWithId(widgetData))
}

export const updateWidget: (WidgetData) => void =
	widgetsSlice.actions.updateWidget
export const addWidgetWithId: (WidgetData) => void =
	widgetsSlice.actions.addWidgetWithId
export const removeWidget: (WidgetId) => void =
	widgetsSlice.actions.removeWidget
export const openWidgetSettings: (WidgetId) => void =
	widgetsSlice.actions.openWidgetSettings
export const closeWidgetSettings: () => mixed =
	widgetsSlice.actions.closeWidgetSettings

// Selectors
const selectors = widgetsAdapter.getSelectors((state) => state.widgets)
export const selectAllWidgets = selectors.selectAll
export const selectAllWidgetIds = selectors.selectIds
export const selectWidgetById = selectors.selectById

export const selectWidgetWithOpenedSettings = (state: RootState) =>
	state.widgets.widgetWithOpenedSettings

export const selectWidgetDataType: (
	RootState,
	widgetId: string
) => ?$PropertyType<WidgetData, 'type'> = createSelector(
	selectWidgetById,
	(widget: WidgetData) => (widget ? widget.type : undefined)
)

// Widget Options

const selectWidgetOption: <T: string>(
	optionName: string,
	defaultValue: T
) => (RootState, widgetId: string) => T = (optionName, defaultValue) =>
	createSelector(selectWidgetById, (widget: ?WidgetData) =>
		widget?.data ? widget.data[optionName] ?? defaultValue : defaultValue
	)

const selectWidgetBooleanOption: (
	optionName: string,
	defaultValue: boolean
) => (RootState, widgetId: string) => boolean = (optionName, defaultValue) =>
	createSelector(
		selectWidgetOption(optionName, defaultValue ? 'true' : 'false'),
		(option: string) => option === 'true'
	)

// Investigations Widget

export const selectWidgetSortByOption: (
	RootState,
	widgetId: string
) => $PropertyType<WidgetOptions, 'sortBy'> = selectWidgetOption(
	'sortBy',
	'time'
)

export const selectWidgetShowFixedOption: (
	RootState,
	widgetId: string
) => ?boolean = selectWidgetBooleanOption('showFixed', false)

export const selectWidgetShowOnlyDefaultBranchOption = selectWidgetBooleanOption(
	'showOnlyDefaultBranch',
	true
)

export default widgetsSlice.reducer
