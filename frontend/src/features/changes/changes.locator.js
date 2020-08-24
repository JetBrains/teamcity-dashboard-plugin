// @flow strict
import type { BranchesLocator } from '../branches/branches.locator'
import { stringifyBranchesLocator } from '../branches/branches.locator'
import type { BuildId } from '../builds/builds.types'
import type { BuildTypeId } from '../buildTypes/buildTypes.types'
import addLocatorCount from '../../utils/addLocatorCount'

export type ChangesLocator = {|
	buildTypeId?: BuildTypeId,
	buildId?: BuildId,
	branch?: BranchesLocator,
	pending?: boolean,
|}

export const stringifyChangesLocator = (
	locator: ChangesLocator,
	withCount?: boolean = true
) => {
	const { buildTypeId, buildId, branch, pending } = locator
	const buildTypeLocator =
		buildTypeId !== undefined && buildTypeId !== null
			? `buildType:(id:${buildTypeId})`
			: ''
	const buildLocator =
		buildId !== undefined && buildId !== null ? `build:(id:${buildId})` : ''
	const branchLocator =
		branch !== undefined && branch !== null
			? `branch:(${stringifyBranchesLocator(branch)})`
			: ''
	const pendingLocator =
		pending !== undefined && pending !== null
			? `pending:${String(pending)}`
			: ''
	const stringLocator = [
		buildTypeLocator,
		buildLocator,
		branchLocator,
		pendingLocator,
	]
		.filter((string) => string !== '')
		.join(',')
	return withCount ? addLocatorCount(stringLocator, 50) : stringLocator
}

export const getPendingBuildTypeChangesLocator = (
	buildTypeId: BuildTypeId,
	branch: BranchesLocator
): ChangesLocator => ({
	buildTypeId,
	branch,
	pending: true,
})

export const getBuildChangesLocator = (buildId: BuildId): ChangesLocator => ({
	buildId,
})
