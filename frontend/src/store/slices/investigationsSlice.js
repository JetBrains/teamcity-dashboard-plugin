// @flow strict
import {
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import fetchInvestigationsByAssignee from '../../api/investigations/fetchInvestigationsByAssignee'
import type { RootState } from '..'
import type { UserId } from '../../commontypes'
import type { InvestigationsWidgetSortByOption, WidgetId } from './widgetsSlice'
import {
	selectWidgetShowFixedOption,
	selectWidgetSortByOption,
} from './widgetsSlice'
import type { User } from '../../api/user/schemata'
import type { BuildTypeId, ProjectId } from '../../hooks/TC/schemata'

export type InvestigationId = string

export type InvestigationState = 'TAKEN' | 'FIXED' | 'GIVEN_UP'

export type InvestigationTargetType = 'buildType' | 'test' | 'problem'

export type BuildId = number

export type Investigation = {
	id: InvestigationId,
	state: InvestigationState,
	date: string, // the string that is returned by Date.prototype.toUTCString()
	projectId: ProjectId,
	// TODO: breaks data normalization principle => may be outdated!!!
	projectFullName: string, // Actually a project-path-like string `Project A / Project B`
	assignedBy: User,
	target: {
		type: InvestigationTargetType,
		// TODO: maybe needs clarification
		id: BuildTypeId | number,
		// TODO: breaks data normalization principle => may be outdated!!!
		name: string,
		buildIds: BuildId[],
		webUrl: string,
		...
	},
	...
}

const investigationsAdapter = createEntityAdapter<Investigation>({
	sortComparer: (a: Investigation, b: Investigation) =>
		new Date(b.date).getTime() - new Date(a.date).getTime(),
})

export interface InvestigationsState {
	ids: InvestigationId[];
	entities: {
		[id: InvestigationId]: Investigation,
		...
	};
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: ?string;
}

export const fetchInvestigations = createAsyncThunk(
	'investigations/fetchInvestigations',
	(userId: UserId) => fetchInvestigationsByAssignee(userId)
)

const investigationsSlice = createSlice<InvestigationsState>({
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

// Selectors
const selectInvestigations = (state: RootState) => state.investigations
const selectors = investigationsAdapter.getSelectors(selectInvestigations)

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

export const selectInvestigationTargetType: (
	RootState,
	InvestigationId
) => ?InvestigationTargetType = createSelector(
	selectInvestigationById,
	(investigation: ?Investigation) => investigation?.target?.type
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

export type InvestigationsVisibilityFilter = {
	showFixed: boolean,
	...
}

export const selectInvestigationsWithVisibilityFilter: (
	RootState,
	InvestigationsVisibilityFilter
) => Investigation[] = createSelector(
	selectAllInvestigations,
	(_, visibilityFilter: InvestigationsVisibilityFilter) => visibilityFilter,
	(
		investigations: Investigation[],
		visibilityFilter: InvestigationsVisibilityFilter
	) => {
		return investigations.filter(
			(investigation) =>
				(investigation.state !== 'FIXED' ||
					visibilityFilter.showFixed) &&
				investigation.target.type === 'buildType'
		)
	}
)

export const selectFilteredInvestigations: (WidgetId) => (RootState) => Investigation[] = (
	widgetId
) =>
	createSelector(
		selectAllInvestigations,
		(state) => selectWidgetShowFixedOption(state, widgetId),
		(investigations: Investigation[], showFixed: boolean) =>
			investigations.filter(
				(investigation: Investigation) =>
					investigation.state !== 'GIVEN_UP' &&
					(investigation.state !== 'FIXED' || showFixed)
			)
	)

export const selectFilteredInvestigationsCount: (WidgetId) => (RootState) => number = (
	widgetId
) =>
	createSelector(
		// TODO: this breaks memoization :c
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
		// TODO: breaks memoization
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

// Reducers
export default investigationsSlice.reducer
