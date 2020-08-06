// @flow strict
import layoutSliceReducer, { type Layout } from './slices/layoutSlice'
import { configureStore } from '@reduxjs/toolkit'
import widgetsSliceReducer, { type WidgetsState } from './slices/widgetsSlice'
import fetchingDashboardDataSliceReducer from './slices/fetchingDashboardData'
import postingDashboardDataSliceReducer from './slices/postingDashboardData'
import investigationsSliceReducer from './slices/investigationsSlice'
import { type AsyncState } from '../commontypes'
import type { InvestigationsState } from './slices/investigationsSlice'

export interface RootState {
	layout: Layout;
	widgets: WidgetsState;
	fetchingDashboardData: AsyncState;
	postingDashboardData: AsyncState;
	investigations: InvestigationsState;
}

const store = configureStore<RootState>({
	reducer: {
		layout: layoutSliceReducer,
		widgets: widgetsSliceReducer,
		fetchingDashboardData: fetchingDashboardDataSliceReducer,
		postingDashboardData: postingDashboardDataSliceReducer,
		investigations: investigationsSliceReducer,
	},
})

export default store
