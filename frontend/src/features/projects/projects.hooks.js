// @flow strict
import { useEffect } from 'react'
import TC from '@teamcity/react-api'
import type { FullPath, Project, ProjectId } from './projects.types'

export const useProject: (
	projectId: ProjectId,
	fetchIfNeeded?: boolean
) => ?Project = TC.hooks.useProject

export const useFetchProjects: () => (force?: boolean) => void =
	TC.hooks.useFetchProjects

export const useFetchProjectsForPath: (ProjectId) => void =
	TC.hooks.useFetchProjectsForPath

export const useFetchProjectsIfGivenProjectIsNotDefined = (
	projectId: ProjectId
) => {
	const project = useProject(projectId, false)
	const fetch = useFetchProjects()

	const fetchNeeded = project === null || project === undefined

	useEffect(() => {
		if (fetchNeeded) {
			fetch(true)
		}
	}, [fetchNeeded, fetch])
}

export const usePathToProject: (projectId: ProjectId) => FullPath =
	TC.hooks.usePathToProject
