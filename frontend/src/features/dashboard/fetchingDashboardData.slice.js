// @flow strict
import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from '@reduxjs/toolkit'
import { getDashboardDataFromServer } from './dashboard.rest'
import type { AsyncState, RejectedAction } from '../../commontypes'
import type { RootState } from '../../store'

// Selectors

const selectFetchingDashboardDataSlice = (state: RootState): AsyncState =>
	state.fetchingDashboardData

const selectFetchingDashboardDataStatus = createSelector(
	selectFetchingDashboardDataSlice,
	(state: AsyncState) => state.status
)

export const fetchDashboardData = createAsyncThunk<?boolean>(
	'fetchingDashboardData',
	() => getDashboardDataFromServer(),
	{
		condition: (force?: boolean = false, { getState }) => {
			const status = selectFetchingDashboardDataStatus(getState())
			if (force) {
				return status !== 'loading'
			}
			return status === 'idle' || status === 'failed'
		},
	}
)

export const fetchingDashboardDataSlice = createSlice<AsyncState>({
	name: 'fetchingDashboardData',
	initialState: {
		status: 'idle',
		error: undefined,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchDashboardData.pending, (state: AsyncState) => {
			state.status = 'loading'
		})
		builder.addCase(fetchDashboardData.fulfilled, (state: AsyncState) => {
			state.status = 'succeeded'
		})
		builder.addCase(
			fetchDashboardData.rejected,
			(state: AsyncState, action: RejectedAction<?boolean>) => {
				state.status = 'failed'
				state.error = action.error.message
			}
		)
	},
})

// Reducer

export default fetchingDashboardDataSlice.reducer
