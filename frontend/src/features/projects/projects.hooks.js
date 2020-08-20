// @flow strict
import TC from '@teamcity/react-api'
import type { Project, ProjectId } from './projects.types'

export const useProject: (
	projectId: ProjectId
) => ?Project = TC.hooks.useProject
