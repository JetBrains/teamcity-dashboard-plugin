// @flow strict
import {
	createEntityAdapter,
	createSelector,
	createSlice,
	ThunkAction,
} from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import type { ChangesLocator } from './changes.locator'
import type { FulfilledAction } from '../../commontypes'
import {
	fetchChangesByLocator,
	selectChangesIdsByLocator,
} from './changesIdsByLocator.slice'
import type {
	ChangesIdsByLocatorEntity,
	FetchChangesByLocatorArgument,
	FetchChangesByLocatorResult,
} from './changesIdsByLocator.types'
import type { BuildId } from '../builds/builds.types'
import type { BuildTypeId } from '../buildTypes/buildTypes.types'
import type {
	Change,
	ChangeId,
	ChangesByLocator,
	ChangesHash,
	ChangesState,
} from './changes.types'
import getUserDisplayName from '../../api/user/getUserDisplayName'

// Thunks

export const fetchPendingBuildTypeChanges = (
	buildTypeId: BuildTypeId,
	force?: boolean
): ThunkAction =>
	fetchChangesByLocator(
		{
			buildTypeId,
			pending: true,
		},
		force
	)

// Slice

const changesAdapter = createEntityAdapter()

const changesSlice = createSlice<ChangesState>({
	name: 'changes',
	initialState: changesAdapter.getInitialState(),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			fetchChangesByLocator.fulfilled,
			(
				state: ChangesState,
				action: FulfilledAction<
					FetchChangesByLocatorArgument,
					FetchChangesByLocatorResult
				>
			) => {
				changesAdapter.upsertMany(state, action.payload.changes)
			}
		)
	},
})

// Selectors

const selectChanges = (state: RootState): ChangesState => state.changes

const selectors = changesAdapter.getSelectors(selectChanges)

export const selectChangesHash: (RootState) => ChangesHash =
	selectors.selectEntities

export const selectChangeById: (RootState, ChangeId) => ?Change =
	selectors.selectById

export const selectChangeFilesCount: (
	RootState,
	ChangeId
) => number = createSelector(
	selectChangeById,
	(change: ?Change) => change?.filesCount ?? 0
)

export const selectChangeWebUrl: (RootState, ChangeId) => ?string = createSelector(
	selectChangeById,
	(change: ?Change): ?string => change?.webUrl
)

export const selectChangeComment: (RootState, ChangeId) => ?string = createSelector(
	selectChangeById,
	(change: ?Change): ?string => change?.comment
)

export const selectChangeDate: (RootState, ChangeId) => ?string = createSelector(
	selectChangeById,
	(change: ?Change): ?string => change?.date
)

export const selectChangeUserDisplayName: (RootState, ChangeId) => ?string = createSelector(
	selectChangeById,
	(change: ?Change): ?string => {
		const {username: vcsUsername, user} = change ?? {}
		if (user === undefined || user === null) {
			return vcsUsername
		} else {
			return getUserDisplayName(user)
		}
	}
)

export const selectChangesByLocator: (
	RootState,
	ChangesLocator
) => ChangesByLocator = createSelector(
	selectChangesIdsByLocator,
	selectChangesHash,
	(changesIdsByLocator: ChangesIdsByLocatorEntity, hash: ChangesHash) => ({
		status: changesIdsByLocator.status,
		error: changesIdsByLocator.error,
		changesIds: changesIdsByLocator.changesIds,
		changes: changesIdsByLocator.changesIds
			.map((id) => hash[id])
			.filter((change) => change !== null && change !== undefined),
	})
)

export const selectBuildChanges: (RootState, BuildId) => ChangesByLocator = (
	state,
	buildId
) =>
	selectChangesByLocator(state, {
		buildId,
	})

export default changesSlice.reducer
