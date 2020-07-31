// @flow strict
import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import type { RootState } from '..'
import type { AsyncState } from '../../commontypes'
import requestBuildTypes from '../../api/buildTypes/requestBuildTypes'
import type { ProjectId } from './projectsSlice'

export type BuildTypeId = string

export type BuildType = {
	id: BuildTypeId,
	name: string,
	projectId: ProjectId,
	projectName: string,
	href: string,
	webUrl: string,
	...
}

const buildTypesAdapter = createEntityAdapter<BuildType>()

export type BuildTypesState = AsyncState & {|
	ids: BuildTypeId[],
	entities: {
		[id: BuildTypeId]: BuildType,
		...
	},
|}

export const fetchBuildTypes = createAsyncThunk(
	'buildTypes/fetchBuildTypes',
	requestBuildTypes
)

const buildTypesSlice = createSlice<BuildTypesState>({
	name: 'buildTypes',
	initialState: buildTypesAdapter.getInitialState({
		status: 'idle',
		error: undefined,
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchBuildTypes.pending, (state: BuildTypesState) => {
			state.status = 'loading'
		})
		builder.addCase(
			fetchBuildTypes.rejected,
			(state: BuildTypesState, action: PayloadAction<Error>) => {
				state.status = 'failed'
				state.error = action.error.message
			}
		)
		builder.addCase(
			fetchBuildTypes.fulfilled,
			(state: BuildTypesState, action: PayloadAction<BuildType[]>) => {
				state.error = undefined
				state.status = 'succeeded'
				buildTypesAdapter.upsertMany(state, action.payload)
			}
		)
	},
})

// Selectors
const selectBuildTypes = (state: RootState) => state.buildTypes
const selectors = buildTypesAdapter.getSelectors(selectBuildTypes)

export const selectAllBuildTypes: (RootState) => BuildType[] =
	selectors.selectAll
export const selectBuildTypeById: (RootState, BuildTypeId) => BuildType =
	selectors.selectById
export const selectBuildTypesStatus = (state: RootState) =>
	state.buildTypes.status

// Reducers
export default buildTypesSlice.reducer
