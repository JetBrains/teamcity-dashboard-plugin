// @flow strict
import TC from '@teamcity/react-api'
import type { Project, ProjectId } from './projects.types'

export const useProject: (
	projectId: ProjectId,
	fetchIfNeeded?: boolean
) => ?Project = TC.hooks.useProject

export const useFetchProjectsForPath: (ProjectId) => void =
	TC.hooks.useFetchProjectsForPath
