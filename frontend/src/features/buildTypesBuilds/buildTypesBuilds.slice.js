// @flow strict
import type { BuildId } from '../builds/builds.types'
import type { BuildTypeId } from '../buildTypes/buildTypes.types'

export type BuildTypeBuilds = {|
	id: BuildTypeId,
	buildIds: BuildId[],
|}

export type BuildTypeBuildsHash = {|
	[id: BuildTypeId]: BuildTypeBuilds,
|}

export type BuildTypeBuildsState = {|
	ids: BuildTypeId[],
	entities: BuildTypeBuildsHash,
|}
