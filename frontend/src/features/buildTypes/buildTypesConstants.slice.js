// @flow strict

import {
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import type {
	BuildTypeConstants,
	BuildTypeConstantsEntity,
	BuildTypeConstantsState,
	BuildTypeId,
} from './buildTypesConstants.types'
import { requestConstantsForSingleBuildType } from './buildTypesConstants.rest'
import type { FulfilledAction, PendingAction, RejectedAction } from '../../commontypes'

const adapter = createEntityAdapter()

const createEmptyEntity = (id: BuildTypeId): BuildTypeConstantsEntity => ({
	id,
	status: 'idle',
	error: undefined,
})

// Selectors

const selectBuildTypesConstantsSlice = (state: RootState) =>
	state.buildTypesConstants

const selectors = adapter.getSelectors(selectBuildTypesConstantsSlice)

const selectBuildTypeConstantsEntityById: (
	RootState,
	BuildTypeId
) => BuildTypeConstantsEntity = (state, buildTypeId) =>
	selectors.selectById(state, buildTypeId) ?? createEmptyEntity(buildTypeId)

export const selectBuildTypeConstantsById: (
	RootState,
	BuildTypeId
) => ?BuildTypeConstants = createSelector(
	selectBuildTypeConstantsEntityById,
	(entity: BuildTypeConstantsEntity) => entity.data
)

// Actions

export const fetchConstantsForSingleBuildType = createAsyncThunk<BuildTypeId>(
	'fetchConstantsForSingleBuildType',
	requestConstantsForSingleBuildType,
	{
		condition: (buildTypeId: BuildTypeId, { getState }) => {
			const entity = selectBuildTypeConstantsEntityById(
				getState(),
				buildTypeId
			)
			return entity.status === 'idle' || entity.status === 'failed'
		},
	}
)

// Slice

const buildTypeConstantsSlice = createSlice<BuildTypeConstantsState>({
	name: 'buildTypesConstants',
	initialState: adapter.getInitialState(),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			fetchConstantsForSingleBuildType.pending,
			(
				state: BuildTypeConstantsState,
				action: PendingAction<BuildTypeId>
			) => {
				const id = action.meta.arg
				const entity = state.entities[id] ?? createEmptyEntity(id)
				entity.status = 'loading'
				state.entities[id] = entity
			}
		)
		builder.addCase(
			fetchConstantsForSingleBuildType.rejected,
			(
				state: BuildTypeConstantsState,
				action: RejectedAction<BuildTypeId>
			) => {
				const id = action.meta.arg
				const entity = state.entities[id] ?? createEmptyEntity(id)
				entity.status = 'failed'
				entity.error = action.error.message
				state.entities[id] = entity
			}
		)
		builder.addCase(
			fetchConstantsForSingleBuildType.fulfilled,
			(
				state: BuildTypeConstantsState,
				action: FulfilledAction<BuildTypeId, BuildTypeConstants>
			) => {
				const id = action.meta.arg
				const entity = state.entities[id] ?? createEmptyEntity(id)
				entity.status = 'succeeded'
				entity.error = undefined
				entity.data = action.payload
			}
		)
	},
})

// Reducer

export default buildTypeConstantsSlice.reducer
