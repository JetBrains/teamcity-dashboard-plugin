// @flow strict
import {
	createEntityAdapter,
	createSlice,
	Dispatch,
	nanoid,
	PayloadAction,
	ThunkAction,
} from '@reduxjs/toolkit'
import { fetchDashboardData } from './fetchingDashboardData'
import { type Record } from '../../commontypes'

export interface WidgetData {
	id: string;
	type: string;
	data: Record<string, string>;
}

export type WidgetDataWithoutId = $Diff<WidgetData, {| id: string |}>

export interface WidgetsState {
	ids: string[];
	entities: Record<string, WidgetData>;
}

const widgetsAdapter = createEntityAdapter<WidgetData>()

const widgetsSlice = createSlice<WidgetsState>({
	name: 'widgets',
	initialState: widgetsAdapter.getInitialState(),
	reducers: {
		updateWidget: (state, action: PayloadAction<WidgetData>) => {
			widgetsAdapter.upsertOne(state, action.payload)
		},
		addWidgetWithId: (state, action: PayloadAction<WidgetData>) => {
			widgetsAdapter.addOne(state, action.payload)
		},
		removeWidget: (state, action: PayloadAction<WidgetData>) => {
			widgetsAdapter.removeOne(state, action.payload.id)
		}
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

export const { updateWidget, addWidgetWithId, removeWidget } = widgetsSlice.actions

// Selectors
const selectors = widgetsAdapter.getSelectors((state) => state.widgets)
export const selectAllWidgets = selectors.selectAll
export const selectAllWidgetIds = selectors.selectIds
export const selectWidgetById = selectors.selectById

export default widgetsSlice.reducer
