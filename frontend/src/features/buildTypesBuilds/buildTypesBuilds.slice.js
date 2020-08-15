// @flow strict
import type { BuildTypeId } from '../../hooks/TC/schemata'
import type { BuildId } from '../builds/builds.slice'
import { createAsyncThunk } from '@reduxjs/toolkit'

export type BuildTypeBuilds = {|
	id: BuildTypeId,
	buildIds: BuildId[],
|}

export type BuildTypeBuildsHash = {|
	[id: BuildTypeId]: BuildTypeBuilds,
|}

export type BuildTypeBuildsState = {|
	ids: BuildTypeId[],
	entities: BuildTypeBuildsHash
|}

const fetchBuildTypeBuilds = createAsyncThunk('buildTypeBuilds/fetch')

