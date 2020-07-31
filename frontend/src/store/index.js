// @flow strict
import layoutSliceReducer, { type Layout } from './slices/layoutSlice'
import { configureStore } from '@reduxjs/toolkit'
import widgetsSliceReducer, { type WidgetsState } from './slices/widgetsSlice'
import fetchingDashboardDataSliceReducer from './slices/fetchingDashboardData'
import postingDashboardDataSliceReducer from './slices/postingDashboardData'
import investigationsSliceReducer from './slices/investigationsSlice'
import { type AsyncState } from '../commontypes'
import type { InvestigationsState } from './slices/investigationsSlice'
import buildTypesSliceReducer from './slices/buildTypesSlice'
import type { BuildTypesState } from './slices/buildTypesSlice'
import type { ProjectsState } from './slices/projectsSlice'
import projectsSliceReducer from './slices/projectsSlice'

export interface RootState {
	layout: Layout;
	widgets: WidgetsState;
	fetchingDashboardData: AsyncState;
	postingDashboardData: AsyncState;
	investigations: InvestigationsState;
	buildTypes: BuildTypesState,
	projects: ProjectsState,
}

const store = configureStore<RootState>({
	reducer: {
		layout: layoutSliceReducer,
		widgets: widgetsSliceReducer,
		fetchingDashboardData: fetchingDashboardDataSliceReducer,
		postingDashboardData: postingDashboardDataSliceReducer,
		investigations: investigationsSliceReducer,
		buildTypes: buildTypesSliceReducer,
		projects: projectsSliceReducer,
	},
})

export default store
