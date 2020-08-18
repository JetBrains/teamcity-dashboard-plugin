// @flow strict
import type { BuildTypeId } from '../../hooks/TC/schemata'
import type { BranchesLocator } from '../branches/branches.locator'
import { stringifyBranchesLocator } from '../branches/branches.locator'
import type { BuildState } from './builds.slice'

export type BuildsLocator = {|
	buildTypeId: BuildTypeId,
	branch: BranchesLocator,
	state?: 'queued' | 'running' | 'finished' | 'any',
|}

export const stringifyBuildsLocator = ({
	buildTypeId,
	branch,
	state,
}: BuildsLocator): string =>
	`buildType:(id:${buildTypeId}),branch:(${stringifyBranchesLocator(
		branch
	)})` + (state ? `,state:${state}` : '')
