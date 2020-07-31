// @flow strict
import {
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import type { AsyncState } from '../../commontypes'
import type { RootState } from '..'
import requestProjects from '../../api/projects/requestProjects'
import computeProjectPath from '../selectorslogic/computeProjectPath'

export type ProjectId = string

export type Project = {
	id: ProjectId,
	parentProjectId: ?ProjectId,
	name: string,
	description: ?string,
	href: string,
	webUrl: string,
	...
}

export type ProjectsHash = {
	[id: ProjectId]: Project,
	...
}

const projectsAdapter = createEntityAdapter<Project>()

export type ProjectsState = AsyncState & {|
	ids: ProjectId[],
	entities: ProjectsHash,
|}

export const fetchProjects = createAsyncThunk(
	'projects/fetchProjects',
	requestProjects
)

const projectsSlice = createSlice<ProjectsState>({
	name: 'projects',
	initialState: projectsAdapter.getInitialState({
		status: 'idle',
		error: undefined,
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProjects.pending, (state: ProjectsState) => {
			state.status = 'loading'
		})
		builder.addCase(
			fetchProjects.rejected,
			(state: ProjectsState, action: PayloadAction<Error>) => {
				state.status = 'failed'
				state.error = action.error.message
			}
		)
		builder.addCase(
			fetchProjects.fulfilled,
			(state: ProjectsState, action: PayloadAction<Project[]>) => {
				state.error = undefined
				state.status = 'succeeded'
				projectsAdapter.upsertMany(state, action.payload)
			}
		)
	},
})

// Selectors
const selectProjects = (state: RootState) => state.projects
const selectors = projectsAdapter.getSelectors(selectProjects)

export const selectProjectsHash: (RootState) => ProjectsHash = selectors.selectEntities
export const selectAllProjects: (RootState) => Project[] = selectors.selectAll
export const selectProjectById: (RootState, ProjectId) => Project = selectors.selectById
export const selectProjectsStatus = (state: RootState) => state.projects.status

export const selectProjectPath: (ProjectId) => (RootState) => Project[] = (
	projectId: ProjectId
) =>
	createSelector(
		selectProjectsHash,
		state => selectProjectById(state, projectId),
		computeProjectPath
	)

// export const selectProjectPath = (id: ProjectId) => (state: RootState) => {
// 	console.log('selecting project path')
// 	const projectsHash = selectProjectsHash(state)
// 	const project = selectProjectById(state, id)
// 	return computeProjectPath(projectsHash, project)
// }

// Reducers
export default projectsSlice.reducer
