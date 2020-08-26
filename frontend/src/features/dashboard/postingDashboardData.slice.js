// @flow strict

import type { RootState } from '../../store'
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { postDashboardDataToServer } from './dashboard.rest'
import type { AsyncState } from '../../commontypes'
import { selectAllWidgets } from '../widgets/widgets.slice'
import type { WidgetData } from '../widgets/widgets.types'
import type { LayoutState } from './layout.types'
import type { DashboardData } from './dashboard.types'
import { type Dispatch } from 'redux'
import debounce from 'just-debounce-it'
import { selectLayout } from './layout.selectors'

const DEBOUNCE_PERIOD = 1000

// Selectors

const selectDashboardData: (RootState) => DashboardData = createSelector(
	selectAllWidgets,
	selectLayout,
	(widgets: WidgetData[], layout: LayoutState): DashboardData => ({
		widgets,
		layout,
	})
)

// Actions

export const postDashboardData = createAsyncThunk(
	'postingDashboardData',
	async (_, { getState }) => {
		const state: RootState = getState()
		await postDashboardDataToServer(selectDashboardData(state))
	}
)

const debouncedPostDashboardDataThunk: (Dispatch<*>) => mixed = debounce(
	(dispatch) => dispatch(postDashboardData()),
	DEBOUNCE_PERIOD
)

export const debouncedPostDashboardData = () => debouncedPostDashboardDataThunk

export const postingDashboardDataSlice = createSlice<AsyncState>({
	name: 'postingDashboardData',
	initialState: {
		status: 'idle',
		error: undefined,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(postDashboardData.pending, (state: AsyncState) => {
			state.status = 'loading'
		})
		builder.addCase(postDashboardData.fulfilled, (state: AsyncState) => {
			state.status = 'succeeded'
		})
		builder.addCase(postDashboardData.rejected, (state, action) => {
			state.status = 'failed'
			state.error = action.error.message
		})
	},
})

// Reducer

export default postingDashboardDataSlice.reducer
