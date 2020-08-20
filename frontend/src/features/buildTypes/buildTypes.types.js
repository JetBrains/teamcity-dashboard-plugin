// @flow strict
import type { ProjectId } from '../projects/projects.types'

export type BuildTypeId = string

export type BuildTypeInternalId = string
export type BuildType = {
	id: BuildTypeId,
	internalId: BuildTypeInternalId,
	name: string,
	projectId: ProjectId,
	webUrl: string,
	...
}
