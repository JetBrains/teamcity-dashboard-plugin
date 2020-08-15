// @flow strict
import type { BuildsLocator } from './builds.locator'
import { stringifyBuildsLocator } from './builds.locator'
import type { Build } from './builds.slice'
import type {
	FulfilledAction,
	PendingAction,
	RejectedAction,
} from '../../commontypes'
import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { requestBuilds } from './builds.rest'
import type {
	BuildsIdsByLocator,
	BuildsIdsByLocatorState,
	FetchBuildsByLocatorArgument,
} from './buildsIdsByLocator.types'

const getEmptyBuildsIdsByLocator = (locator: BuildsLocator) => ({
	id: stringifyBuildsLocator(locator),
	locator,
	ids: [],
	status: 'idle',
	error: undefined,
})

const adapter = createEntityAdapter()

// Selectors

const selectBuildsIdsByLocatorSlice = (state: RootState) =>
	state.buildsIdsByLocator

const selectors = adapter.getSelectors(selectBuildsIdsByLocatorSlice)

export const selectBuildsIdsByLocator: (
	RootState,
	BuildsLocator
) => BuildsIdsByLocator = (state, locator) =>
	selectors.selectById(state, stringifyBuildsLocator(locator)) ??
	getEmptyBuildsIdsByLocator(locator)

// Thunks

/**
 * @param {BuildsLocator} locator
 * @param {boolean} force
 */
export const fetchBuildsByLocator = createAsyncThunk<FetchBuildsByLocatorArgument>(
	'fetchBuildsByLocator',
	({ locator }: FetchBuildsByLocatorArgument) => {
		console.log('fetchBuildsByLocator payloadCreator fired')
		return requestBuilds(locator)
	},
	{
		condition: (
			{ locator, force }: FetchBuildsByLocatorArgument,
			{ getState }
		) => {
			if (force === true) {
				console.log(
					'fetchBuildByLocator will be performed bc force=',
					force
				)
				return true
			}
			const buildsIdsByLocator = selectBuildsIdsByLocator(
				getState(),
				locator
			)
			console.log(
				'fetchBuildByLocator will be performed =',
				buildsIdsByLocator.status === 'idle' ||
					buildsIdsByLocator.status === 'failed',
				'locator=',
				locator
			)
			return (
				buildsIdsByLocator.status === 'idle' ||
				buildsIdsByLocator.status === 'failed'
			)
		},
	}
)

// Slice

const buildsIdsByLocatorSlice = createSlice<BuildsIdsByLocatorState>({
	name: 'buildsIdsByLocator',
	initialState: adapter.getInitialState(),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			fetchBuildsByLocator.pending,
			(
				state: BuildsIdsByLocatorState,
				action: PendingAction<FetchBuildsByLocatorArgument>
			) => {
				const locator = action.meta.arg.locator
				const id = stringifyBuildsLocator(locator)
				const entity =
					state.entities[id] ?? getEmptyBuildsIdsByLocator(locator)
				entity.status = 'loading'
				state.entities[id] = entity
			}
		)
		builder.addCase(
			fetchBuildsByLocator.rejected,
			(
				state: BuildsIdsByLocatorState,
				action: RejectedAction<FetchBuildsByLocatorArgument>
			) => {
				const locator = action.meta.arg.locator
				const id = stringifyBuildsLocator(locator)
				const entity =
					state.entities[id] ?? getEmptyBuildsIdsByLocator(locator)
				entity.status = 'failed'
				entity.error = action.error.message
				state.entities[id] = entity
			}
		)
		builder.addCase(
			fetchBuildsByLocator.fulfilled,
			(
				state: BuildsIdsByLocatorState,
				action: FulfilledAction<FetchBuildsByLocatorArgument, Build[]>
			) => {
				const locator = action.meta.arg.locator
				const id = stringifyBuildsLocator(locator)
				const entity =
					state.entities[id] ?? getEmptyBuildsIdsByLocator(locator)
				entity.status = 'succeeded'
				entity.error = undefined
				entity.ids = action.payload.map((build) => build.id)
			}
		)
	},
})

// Reducer

export default buildsIdsByLocatorSlice.reducer
