// @flow strict
import {
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	createSlice,
} from '@reduxjs/toolkit'
import type { FulfilledAction, PendingAction, RejectedAction } from '../../commontypes'
import { requestChanges, requestChangesCount } from './changes.rest'
import type { ChangesLocator } from './changes.locator'
import { stringifyChangesLocator } from './changes.locator'
import type { RootState } from '../../store'
import type {
	ChangesIdsByLocatorEntity,
	ChangesIdsByLocatorState,
	FetchChangesByLocatorArgument,
	FetchChangesByLocatorResult,
} from './changesIdsByLocator.types'
import type { BuildId } from '../builds/builds.types'

const getEmptyChangesIdsByLocator = (
	locator: ChangesLocator
): ChangesIdsByLocatorEntity => ({
	id: stringifyChangesLocator(locator),
	locator,
	actualCount: 0,
	changesIds: [],
	status: 'idle',
	error: undefined,
})

const changesIdsByLocatorAdapter = createEntityAdapter<ChangesIdsByLocatorEntity>()

// Selectors

const selectSlice = (state: RootState) => state.changesIdsByLocator

const selectors = changesIdsByLocatorAdapter.getSelectors(selectSlice)

export const selectChangesIdsByLocator: (
	RootState,
	locator: ChangesLocator
) => ChangesIdsByLocatorEntity = (state, locator) => {
	return (
		selectors.selectById(state, stringifyChangesLocator(locator)) ??
		getEmptyChangesIdsByLocator(locator)
	)
}

export const selectChangesActualCountByLocator: (
	RootState,
	locator: ChangesLocator
) => number = createSelector(
	selectChangesIdsByLocator,
	(entity: ChangesIdsByLocatorEntity) => entity.actualCount
)

export const selectBuildChangesIds: (
	RootState,
	BuildId
) => ChangesIdsByLocatorEntity = (state, buildId) =>
	selectChangesIdsByLocator(state, {
		buildId,
		pending: false,
	})

// Thunks

/**
 * @param {ChangesLocator} locator
 * @param {boolean} force
 */
export const fetchChangesByLocator = createAsyncThunk<FetchChangesByLocatorArgument>(
	'fetchChangesByLocator',
	async ({
		locator,
	}: FetchChangesByLocatorArgument): Promise<FetchChangesByLocatorResult> => ({
		changes: await requestChanges(locator),
		actualCount: await requestChangesCount(locator),
	}),
	{
		condition: (
			{ locator, force = false }: FetchChangesByLocatorArgument,
			{ getState }
		) => {
			if (force) {
				return true
			}
			const changesIdsByLocator = selectChangesIdsByLocator(
				getState(),
				locator
			)
			return (
				changesIdsByLocator.status === 'idle' ||
				changesIdsByLocator.status === 'failed'
			)
		},
	}
)

// Slice

const changesIdsByLocatorSlice = createSlice<ChangesIdsByLocatorState>({
	name: 'changesIdsByLocator',
	initialState: changesIdsByLocatorAdapter.getInitialState(),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			fetchChangesByLocator.pending,
			(
				state: ChangesIdsByLocatorState,
				action: PendingAction<FetchChangesByLocatorArgument>
			) => {
				const locator = action.meta.arg.locator
				const id = stringifyChangesLocator(locator)
				if (!state.entities[id]) {
					changesIdsByLocatorAdapter.upsertOne(
						getEmptyChangesIdsByLocator(locator)
					)
				}
				const entity: ChangesIdsByLocatorEntity = state.entities[id]
				entity.status = 'loading'
				state.entities[id] = entity
			}
		)
		builder.addCase(
			fetchChangesByLocator.rejected,
			(
				state: ChangesIdsByLocatorState,
				action: RejectedAction<FetchChangesByLocatorArgument>
			) => {
				const locator = action.meta.arg.locator
				const id = stringifyChangesLocator(locator)
				state.entities[id].status = 'failed'
				state.entities[id].error = action.error.message
			}
		)
		builder.addCase(
			fetchChangesByLocator.fulfilled,
			(
				state: ChangesIdsByLocatorState,
				action: FulfilledAction<
					FetchChangesByLocatorArgument,
					FetchChangesByLocatorResult
				>
			) => {
				const locator = action.meta.arg.locator
				const id = stringifyChangesLocator(locator)
				state.entities[id].status = 'succeeded'
				state.entities[id].error = undefined
				state.entities[id].actualCount = action.payload.actualCount
				state.entities[id].changesIds = action.payload.changes.map(
					(change) => change.id
				)
			}
		)
	},
})

// Reducer

export default changesIdsByLocatorSlice.reducer
