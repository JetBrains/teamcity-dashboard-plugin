// @flow strict
import type { BuildTypeId } from '../../hooks/TC/schemata'
import type { ChangeId } from '../changes/changes.slice'
import {
	createEntityAdapter,
	createSelector,
	createSlice,
} from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import type { BuildsLocator } from './builds.locator'
import { fetchBuildsByLocator } from './buildsIdsByLocator.slice'
import type { FulfilledAction } from '../../commontypes'
import type { UserId } from '../../api/user/schemata'

export type BuildId = number

export type BuildStatus =
	| 'UNKNOWN'
	| 'SUCCESS'
	| 'WARNING'
	| 'FAILURE'
	| 'ERROR'

export type BuildState =
	| 'queued'
	| 'running'
	| 'finished'
	| 'deleted'
	| 'unknown'

export type Build = {
	id: BuildId,
	buildTypeId: BuildTypeId,
	status: BuildStatus,
	statusText: string,
	state: BuildState,
	branchName: string,
	changesCount: number,
	// personal: boolean,
	number: string,
	// failedToStart?: boolean,
	// wasCanceled: boolean,
	userId?: UserId,
	// changeIds: ChangeId[],
	...
}

export type BuildsHash = {|
	[id: BuildId]: Build,
|}

export type BuildsState = {|
	ids: BuildId[],
	entities: BuildsHash,
|}

const buildsAdapter = createEntityAdapter()

const buildsSlice = createSlice({
	name: 'builds',
	initialState: buildsAdapter.getInitialState(),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			fetchBuildsByLocator.fulfilled,
			(
				state: BuildsState,
				action: FulfilledAction<
					{ locator: BuildsLocator, ... },
					Build[]
				>
			) => {
				buildsAdapter.upsertMany(state, action.payload)
			}
		)
	},
})

// Selector

const selectBuildsSlice: (RootState) => BuildsState = (state) => state.builds

const selectors = buildsAdapter.getSelectors(selectBuildsSlice)

export const selectBuildById: (RootState, BuildId) => Build =
	selectors.selectById



// Reducers

export default buildsSlice.reducer
