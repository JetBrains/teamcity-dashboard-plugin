// @flow strict

import type { BuildTypeConstants } from './buildTypesConstants.types'
import type { ProjectId, ProjectInternalId } from '../projects/projects.types'
import TC from '@teamcity/react-api'
import type { BuildTypeId, BuildTypeInternalId } from './buildTypes.types'

type FetchedBuildTypeConstants = {
	id: BuildTypeId,
	internalId: BuildTypeInternalId,
	project: {
		id: ProjectId,
		internalId: ProjectInternalId,
		...
	},
	...
}

const buildTypeConstantsFields = 'id,internalId,project(id,internalId)'

const parseBuildTypeConstants = (
	fetchedConstants: FetchedBuildTypeConstants
): BuildTypeConstants => {
	const { id, internalId, project } = fetchedConstants
	return {
		id,
		internalId,
		projectId: project.id,
		internalProjectId: project.internalId,
	}
}

export const requestConstantsForSingleBuildType = async (
	buildTypeId: BuildTypeId
): Promise<BuildTypeConstants> =>
	parseBuildTypeConstants(
		await TC.requestJSON(
			`app/rest/buildTypes/id:${buildTypeId}?fields=${buildTypeConstantsFields}`
		)
	)
