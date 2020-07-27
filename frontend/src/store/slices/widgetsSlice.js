// @flow strict
import {
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import { fetchDashboardData } from './fetchingDashboardData'
import { type Record } from '../../commontypes'

export interface WidgetData {
	id: string;
	type: string;
	data: Record<string, string>;
}

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
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDashboardData.fulfilled, (state, action) => {
			widgetsAdapter.upsertMany(state, action.payload.widgets)
		})
	},
})

// Actions
export const { updateWidget } = widgetsSlice.actions

// Selectors
const selectors = widgetsAdapter.getSelectors((state) => state.widgets)
export const selectAllWidgets = selectors.selectAll
export const selectWidgetById = selectors.selectById

export default widgetsSlice.reducer
