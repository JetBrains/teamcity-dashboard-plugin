// @flow strict
import TC from '@teamcity/react-api'
import type { ProjectId } from '../../hooks/TC/schemata'

export const useProject: (
	projectId: ProjectId
) => ?{ id: ProjectId, internalId: string, ... } = TC.hooks.useProject
