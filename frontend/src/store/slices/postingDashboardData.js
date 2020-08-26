// @flow strict
import { type RootState } from '..'
import { type AsyncState, type DashboardData } from '../../commontypes'
import { postDashboardDataToServer } from '../../api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { filterVisibleWidgetIds } from '../../features/widgets/widgets.utils'
import type { LayoutElementData } from '../../features/dashboard/layout.types'

function prepareGridElementData(element: LayoutElementData): LayoutElementData {
	const { i, x, y, w, h } = element
	return { i, x, y, w, h }
}

function rootStateToDashboardData(state: RootState): DashboardData {
	return {
		layout: state.layout.map((element) => prepareGridElementData(element)),
		widgets: filterVisibleWidgetIds(state.widgets.ids).map(
			(id) => state.widgets.entities[id]
		),
	}
}

export const postDashboardData = createAsyncThunk(
	'postingDashboardData',
	async (_, { getState }) => {
		const state: RootState = getState()
		await postDashboardDataToServer(rootStateToDashboardData(state))
	}
)

const postingDashboardDataSlice = createSlice<AsyncState>({
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

export default postingDashboardDataSlice.reducer
