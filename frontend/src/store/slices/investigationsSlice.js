// @flow strict
import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import fetchInvestigationsByAssignee from '../../api/investigations/fetchInvestigationsByAssignee'
import type { RootState } from '..'
import type { ProjectId } from './projectsSlice'
import type { BuildTypeId } from './buildTypesSlice'
import type { UserId } from '../../commontypes'

export type InvestigationId = string

export type Investigation = {
	id: InvestigationId,
	state: 'TAKEN' | 'FIXED' | 'GIVEN_UP',
	date: string, // the string that is returned by Date.prototype.toUTCString()
	projectId: ProjectId,
	projectFullName: string, // Actually a project-path-like string `Project A / Project B`
	assignedBy: UserId,
	target: {
		type: 'buildType' | 'test' | 'problem',
		// TODO: maybe needs clarification
		id: BuildTypeId | string | string,
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
	(userId: string) => fetchInvestigationsByAssignee(userId)
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
export const selectInvestigationsStatus = (state: RootState) =>
	state.investigations.status

// export const selectProjectsWithInvestigations = (
// 	state: RootState
// ): ProjectWithInvestigations[] => {
// 	const investigations = selectAllInvestigations(state)
// 	const projectHash = selectProjectsHash(state)
// 	const paths: Project[][] = []
// 	for (const investigation of investigations) {
// 		const path = selectProjectPath(investigation.projectId)(state)
// 		paths.push(path)
// 	}
// 	const tree = buildProjectsTreeFromPaths(projectHash, paths)
// 	populateProjectsTreeWithInvestigations(tree, investigations)
// 	return collectProjectsWithInvestigationsFromTree(tree)
// }

export const selectInvestigationsSortedByName = (
	state: RootState
): Investigation[] => {
	const investigations = selectAllInvestigations(state)
	const copy = investigations.slice()
	copy.sort((investigation1, investigation2) =>
		investigation1.projectFullName.localeCompare(investigation2.projectFullName)
	)
	return copy
}

// Reducers
export default investigationsSlice.reducer
