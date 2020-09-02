// @flow strict
import TC from '@teamcity/react-api'
import type { FullPath, Project, ProjectId } from './projects.types'

export const useProject: (
	projectId: ProjectId,
	fetchIfNeeded?: boolean
) => ?Project = TC.hooks.useProject

export const useFetchProjects: () => void = TC.hooks.useFetchProjects

export const usePathToProject: (projectId: ProjectId) => FullPath =
	TC.hooks.usePathToProject
