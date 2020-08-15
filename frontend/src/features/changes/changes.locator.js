// @flow strict

import type { BuildTypeId } from '../../hooks/TC/schemata'
import type { BuildId } from '../builds/builds.slice'
import type { BranchesLocator } from '../branches/branches.locator'
import { stringifyBranchesLocator } from '../branches/branches.locator'

export type ChangesLocator = {|
	buildTypeId?: BuildTypeId,
	buildId?: BuildId,
	branch?: BranchesLocator,
	pending?: boolean,
|}

export const stringifyChangesLocator = (locator: ChangesLocator) => {
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
	return [buildTypeLocator, buildLocator, branchLocator, pendingLocator]
		.filter((string) => string !== '')
		.join(',')
}
