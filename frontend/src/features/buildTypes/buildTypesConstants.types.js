// @flow strict

import type { ProjectId, ProjectInternalId } from '../projects/projects.types'
import type { AsyncState, AsyncStatus } from '../../commontypes'

export type BuildTypeId = string

export type BuildTypeInternalId = string

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
	[id: BuildTypeId]: BuildTypeConstantsEntity
|}

export type BuildTypeConstantsState = {|
	ids: BuildTypeId[],
	entities: BuildTypeConstantsHash,
|}
