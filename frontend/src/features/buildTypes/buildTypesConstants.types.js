// @flow strict

import type { ProjectId, ProjectInternalId } from '../projects/projects.types'
import type { AsyncState } from '../../commontypes'
import type { BuildTypeId, BuildTypeInternalId } from './buildTypes.types'

export type BuildTypeConstants = {|
	id: BuildTypeId,
	internalId: BuildTypeInternalId,
	projectId: ProjectId,
	internalProjectId: ProjectInternalId,
|}

export type BuildTypeConstantsEntity = {|
	id: BuildTypeId,
	data?: BuildTypeConstants,
	...AsyncState,
|}

export type BuildTypeConstantsHash = {|
	[id: BuildTypeId]: BuildTypeConstantsEntity,
|}

export type BuildTypeConstantsState = {|
	ids: BuildTypeId[],
	entities: BuildTypeConstantsHash,
|}
