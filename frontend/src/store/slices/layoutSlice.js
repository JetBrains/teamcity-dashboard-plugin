// @flow strict
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchDashboardData } from './fetchingDashboardData'
import { type DashboardData } from '../../commontypes'
import { type RootState } from '..'
import { addWidgetWithId, type WidgetData } from './widgetsSlice'

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
		builder.addCase(
			addWidgetWithId,
			(state, action: PayloadAction<WidgetData>) => {
				const element = {
					i: action.payload.id,
					x: 5,
					y: Infinity,
					w: 5,
					h: 5,
				}
				state.push(element)
			}
		)
	},
})

// Actions
export const { setLayout } = layoutSlice.actions
export const addLayoutElement = layoutSlice.actions

// Selectors
export const selectLayout = (state: RootState) => state.layout

export default layoutSlice.reducer
