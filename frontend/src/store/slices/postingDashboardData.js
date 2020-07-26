// @flow strict
import type {RootState} from '..';
import type {AsyncState, DashboardData} from '../../commontypes';
import type {GridElementData} from './layoutSlice';
import {postDashboardDataToServer} from '../../api';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

function prepareGridElementData(element: GridElementData): GridElementData {
	const {i, x, y, w, h} = element;
	return {i, x, y, w, h};
}

function rootStateToDashboardData(state: RootState): DashboardData {
	return {
		layout: state.layout.map(element => prepareGridElementData(element)),
		widgets: state.widgets.ids.map(id => state.widgets.entities[id])
	};
}

export const postDashboardData = createAsyncThunk(
	'postingDashboardData',
	async (_, {getState}) => {
		const state: RootState = getState();
		await postDashboardDataToServer(rootStateToDashboardData(state));
	});

const postingDashboardDataSlice = createSlice<AsyncState>({
	name: 'postingDashboardData',
	initialState: {
		status: 'idle',
		error: null
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(postDashboardData.pending, (state: AsyncState) => {
			state.status = 'loading';
		});
		builder.addCase(postDashboardData.fulfilled, (state: AsyncState) => {
			state.status = 'succeeded';
		});
		builder.addCase(postDashboardData.rejected, (state, action) => {
			state.status = 'failed';
			state.error = action.payload;
		});
	}
});

export default postingDashboardDataSlice.reducer;
