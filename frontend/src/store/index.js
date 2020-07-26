// @flow strict
import type {Layout} from './slices/layoutSlice';
import {configureStore} from '@reduxjs/toolkit';
import layoutSliceReducer from './slices/layoutSlice';
import widgetsSliceReducer from './slices/widgetsSlice';
import fetchingDashboardDataSliceReducer from './slices/fetchingDashboardData';
import postingDashboardDataSliceReducer from './slices/postingDashboardData';
import type {WidgetsState} from './slices/widgetsSlice';
import type {AsyncState} from '../commontypes';

export interface RootState {
	layout: Layout;
	widgets: WidgetsState;
	fetchingDashboardData: AsyncState;
	postingDashboardData: AsyncState;
}

const store = configureStore<RootState>({
	reducer: {
		layout: layoutSliceReducer,
		widgets: widgetsSliceReducer,
		fetchingDashboardData: fetchingDashboardDataSliceReducer,
		postingDashboardData: postingDashboardDataSliceReducer
	}
});

export default store;
