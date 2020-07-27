// @flow strict
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchDashboardData } from './fetchingDashboardData'
import { type DashboardData } from '../../commontypes'
import { type RootState } from '..'

export interface GridElementData {
	i: string;
	x: number;
	y: number;
	w: number;
	h: number;
}

export type Layout = GridElementData[]

const layoutSlice = createSlice<Layout>({
	name: 'layout',
	initialState: [],
	reducers: {
		setLayout: (state, action: PayloadAction<Layout>) => action.payload,
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchDashboardData.fulfilled,
			(state, action: PayloadAction<DashboardData>) =>
				action.payload.layout
		)
	},
})

// Actions
export const { setLayout } = layoutSlice.actions

// Selectors
export const selectLayout = (state: RootState) => state.layout

export default layoutSlice.reducer
