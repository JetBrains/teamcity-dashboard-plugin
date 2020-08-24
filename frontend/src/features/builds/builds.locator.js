// @flow strict
import type { BranchesLocator } from '../branches/branches.locator'
import { stringifyBranchesLocator } from '../branches/branches.locator'
import type { BuildTypeId } from '../buildTypes/buildTypes.types'
import addLocatorCount from '../../utils/addLocatorCount'

export type BuildsLocator = {|
	buildTypeId: BuildTypeId,
	branch: BranchesLocator,
	state?: 'queued' | 'running' | 'finished' | 'any',
|}

export const stringifyBuildsLocator = (
	{ buildTypeId, branch, state }: BuildsLocator,
	withCount?: boolean = true
): string => {
	const locator =
		`buildType:(id:${buildTypeId}),branch:(${stringifyBranchesLocator(
			branch
		)})` + (state ? `,state:${state}` : '')

	return withCount ? addLocatorCount(locator, 50) : locator
}
