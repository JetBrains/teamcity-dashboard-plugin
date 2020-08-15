// @flow strict
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getDashboardDataFromServer } from '../../api'
import { type AsyncState } from '../../commontypes'
import { type RootState } from '..'

export const fetchDashboardData = createAsyncThunk<void>(
	'fetchingDashboardData',
	getDashboardDataFromServer
)

const fetchingDashboardDataSlice = createSlice<AsyncState>({
	name: 'fetchingDashboardData',
	initialState: {
		status: 'idle',
		error: undefined,
	},
	reducers: {},
	extraReducers: {
		[fetchDashboardData.pending.toString()]: (state: AsyncState) => {
			state.status = 'loading'
		},
		[fetchDashboardData.fulfilled.toString()]: (state: AsyncState) => {
			state.status = 'succeeded'
		},
		[fetchDashboardData.rejected.toString()]: (
			state: AsyncState,
			action: PayloadAction<string>
		) => {
			state.error = action.error.message
		},
	},
})

// Selectors
export const selectFetchingDashboardDataState = (state: RootState) =>
	state.fetchingDashboardData

export default fetchingDashboardDataSlice.reducer
