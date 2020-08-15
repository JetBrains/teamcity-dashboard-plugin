// @flow strict
import type { BuildTypeId } from '../../hooks/TC/schemata'
import type { BranchesLocator } from '../branches/branches.locator'
import { stringifyBranchesLocator } from '../branches/branches.locator'

export type BuildsLocator = {|
	buildTypeId: BuildTypeId,
	branch: BranchesLocator,
|}

export const stringifyBuildsLocator = ({
	buildTypeId,
	branch,
}: BuildsLocator): string =>
	`buildType:(id:${buildTypeId}),branch:(${stringifyBranchesLocator(branch)})`
