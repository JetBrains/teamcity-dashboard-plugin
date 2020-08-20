// @flow strict
import type { RootState } from '../../store'
import type {
	FetchInvestigationsArgument,
	Investigation,
	InvestigationId,
	InvestigationsState,
	InvestigationState,
} from './investigations.types'
import type {
	InvestigationsWidgetSortByOption,
	WidgetId,
	WidgetOptions,
} from '../widgets/widgets.types'
import { selectWidgetOption } from '../widgets/widgets.slice'
import {
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import type { User } from '../../api/user/schemata'
import { fetchInvestigationsByAssignee } from './investigations.rest'

const investigationsAdapter = createEntityAdapter<Investigation>({
	sortComparer: (a: Investigation, b: Investigation) =>
		new Date(b.date).getTime() - new Date(a.date).getTime(),
})

// Selectors
const selectInvestigationsSlice = (state: RootState) => state.investigations

const selectors = investigationsAdapter.getSelectors(selectInvestigationsSlice)

export const selectInvestigationById: (
	RootState,
	InvestigationId
) => Investigation = selectors.selectById

export const selectAllInvestigations: (RootState) => Investigation[] =
	selectors.selectAll

export const selectAllInvestigationsIds: (RootState) => InvestigationId[] =
	selectors.selectIds

export const selectInvestigationsStatus = (state: RootState) =>
	state.investigations.status

export const selectInvestigationState: (
	RootState,
	InvestigationId
) => ?InvestigationState = createSelector(
	selectInvestigationById,
	(investigation: ?Investigation) => investigation?.state
)

export const selectInvestigationAssignedBy: (
	RootState,
	InvestigationId
) => ?User = createSelector(
	selectInvestigationById,
	(investigation: ?Investigation) => investigation?.assignedBy
)

export const selectInvestigationAssignmentDate: (
	RootState,
	InvestigationId
) => ?Date = createSelector(
	selectInvestigationById,
	(investigation: ?Investigation) =>
		investigation?.date ? new Date(investigation.date) : undefined
)

export const selectInvestigationsSortedByName = (
	state: RootState
): Investigation[] => {
	const investigations = selectAllInvestigations(state)
	const copy = investigations.slice()
	copy.sort((investigation1, investigation2) =>
		investigation1.projectFullName.localeCompare(
			investigation2.projectFullName
		)
	)
	return copy
}

export const selectWidgetSortByOption: (
	RootState,
	widgetId: string
) => $PropertyType<WidgetOptions, 'sortBy'> = selectWidgetOption(
	'sortBy',
	'time'
)

export const selectWidgetShowFixedOption: (
	RootState,
	widgetId: string
) => ?boolean = selectWidgetOption<boolean>('showFixed', false)

export const selectWidgetShowOnlyDefaultBranchOption = selectWidgetOption<boolean>(
	'showOnlyDefaultBranch',
	true
)

export const selectFilteredInvestigations: (WidgetId) => (RootState) => Investigation[] = (
	widgetId
) =>
	createSelector(
		selectAllInvestigations,
		(state) => selectWidgetShowFixedOption(state, widgetId),
		(state) => selectWidgetShowOnlyDefaultBranchOption(state, widgetId),
		(
			investigations: Investigation[],
			showFixed: boolean,
			showOnlyDefaultBranch: boolean
		) =>
			investigations.filter(
				(investigation: Investigation) =>
					investigation.state !== 'GIVEN_UP' &&
					(investigation.state !== 'FIXED' || showFixed) &&
					(investigation.defaultBranch || !showOnlyDefaultBranch)
			)
	)

export const selectFilteredInvestigationsCount: (WidgetId) => (RootState) => number = (
	widgetId
) =>
	createSelector(
		selectFilteredInvestigations(widgetId),
		(investigations: Investigation[]) => investigations.length
	)

const investigationsSortByNameComparator = (
	investigation1: Investigation,
	investigation2: Investigation
): number => {
	const pathComparisonResult = investigation1.projectFullName.localeCompare(
		investigation2.projectFullName
	)
	return pathComparisonResult === 0
		? investigation1.target.name.localeCompare(investigation2.target.name)
		: pathComparisonResult
}

export const selectFilteredSortedInvestigations: (
	widgetId: string
) => (RootState) => Investigation[] = (widgetId: string) =>
	createSelector(
		selectFilteredInvestigations(widgetId),
		(state) => selectWidgetSortByOption(state, widgetId),
		(
			investigations: Investigation[],
			sortBy: InvestigationsWidgetSortByOption
		) => {
			if (sortBy === 'time') {
				return investigations
			}
			const copy = investigations.slice()
			copy.sort(investigationsSortByNameComparator)
			return copy
		}
	)

// Actions

export const fetchInvestigations = createAsyncThunk<FetchInvestigationsArgument>(
	'investigations/fetchInvestigations',
	({ userId }: FetchInvestigationsArgument) =>
		fetchInvestigationsByAssignee(userId),
	{
		condition(
			{ force = false }: FetchInvestigationsArgument,
			{ getState }
		) {
			const status = selectInvestigationsStatus(getState())
			if (force) {
				return status !== 'loading'
			}
			return status === 'idle' || status === 'failed'
		},
	}
)

// Slice

export const investigationsSlice = createSlice<InvestigationsState>({
	name: 'investigations',
	initialState: investigationsAdapter.getInitialState({
		status: 'idle',
		error: undefined,
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			fetchInvestigations.pending,
			(state: InvestigationsState) => {
				state.status = 'loading'
			}
		)
		builder.addCase(
			fetchInvestigations.rejected,
			(state: InvestigationsState, action: PayloadAction<Error>) => {
				state.status = 'failed'
				state.error = action.error.message
			}
		)
		builder.addCase(
			fetchInvestigations.fulfilled,
			(
				state: InvestigationsState,
				action: PayloadAction<Investigation[]>
			) => {
				state.error = undefined
				state.status = 'succeeded'
				investigationsAdapter.upsertMany(state, action.payload)
			}
		)
	},
})

// Reducer

export default investigationsSlice.reducer
