// @flow strict
import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit'
import type { FulfilledAction, PendingAction } from '../../commontypes'
import type { Change } from './changes.slice'
import { requestChanges } from './changes.rest'
import type { ChangesLocator } from './changes.locator'
import { stringifyChangesLocator } from './changes.locator'
import type { RootState } from '../../store'
import type { BuildId } from '../builds/builds.slice'
import type { BuildTypeId } from '../../hooks/TC/schemata'
import type {
	ChangesIdsByLocator,
	ChangesIdsByLocatorState,
	FetchChangesByLocatorArg,
} from './changesIdsByLocator.types'
import type { RejectedAction } from '../../../flow-typed/npm/@reduxjs/toolkit_vx.x.x'

const getEmptyChangesIdsByLocator = (locator: ChangesLocator) => ({
	id: stringifyChangesLocator(locator),
	locator,
	changesIds: [],
	status: 'idle',
	error: undefined,
})

const changesIdsByLocatorAdapter = createEntityAdapter<ChangesIdsByLocator>()

// Selectors

const selectSlice = (state: RootState) => state.changesIdsByLocator

const selectors = changesIdsByLocatorAdapter.getSelectors(selectSlice)

export const selectChangesIdsByLocator: (
	RootState,
	locator: ChangesLocator
) => ChangesIdsByLocator = (state, locator) => {
	return (
		selectors.selectById(state, stringifyChangesLocator(locator)) ??
		getEmptyChangesIdsByLocator(locator)
	)
}

export const selectBuildChangesIds: (
	RootState,
	BuildId
) => ChangesIdsByLocator = (state, buildId) =>
	selectChangesIdsByLocator(state, {
		buildId,
		pending: false,
	})

// Thunks

/**
 * @param {ChangesLocator} locator
 * @param {boolean} force
 */
export const fetchChangesByLocator = createAsyncThunk<FetchChangesByLocatorArg>(
	'fetchChangesByLocator',
	({ locator }: { locator: ChangesLocator, force?: boolean, ... }) =>
		requestChanges(locator),
	{
		condition: (
			{
				locator,
				force = false,
			}: { locator: ChangesLocator, force?: boolean, ... },
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
				action: PendingAction<FetchChangesByLocatorArg>
			) => {
				const locator = action.meta.arg.locator
				const id = stringifyChangesLocator(locator)
				const entity =
					state.entities[id] ?? getEmptyChangesIdsByLocator(locator)
				entity.status = 'loading'
				state.entities[id] = entity
			}
		)
		builder.addCase(
			fetchChangesByLocator.rejected,
			(
				state: ChangesIdsByLocatorState,
				action: RejectedAction<FetchChangesByLocatorArg>
			) => {
				const locator = action.meta.arg.locator
				const id = stringifyChangesLocator(locator)
				const entity =
					state.entities[id] ?? getEmptyChangesIdsByLocator(locator)
				entity.status = 'failed'
				entity.error = action.error.message
				state.entities[id] = entity
			}
		)
		builder.addCase(
			fetchChangesByLocator.fulfilled,
			(
				state: ChangesIdsByLocatorState,
				action: FulfilledAction<FetchChangesByLocatorArg, Change[]>
			) => {
				const locator = action.meta.arg.locator
				const id = stringifyChangesLocator(locator)
				const entity =
					state.entities[id] ?? getEmptyChangesIdsByLocator(locator)
				entity.status = 'succeeded'
				entity.error = undefined
				entity.changesIds = action.payload.map(change => change.id)
				state.entities[id] = entity
			}
		)
	},
})

// Reducer

export default changesIdsByLocatorSlice.reducer
