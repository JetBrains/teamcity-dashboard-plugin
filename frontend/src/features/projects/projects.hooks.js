// @flow strict
import TC from '@teamcity/react-api'
import type { FullPath, Project, ProjectId } from './projects.types'

export const useProject: (projectId: ProjectId) => ?Project =
	TC.hooks.useProject

export const usePathToProject: (projectId: ProjectId) => FullPath =
	TC.hooks.usePathToProject
