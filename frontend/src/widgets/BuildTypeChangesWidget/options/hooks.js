// @flow strict

import {
	useThisWidgetOption,
	useThisWidgetState,
} from '../../../features/widgets/widgets.hooks'
import type { BranchesLocator } from '../../../features/branches/branches.locator'
import type { BuildTypeId } from '../../../features/buildTypes/buildTypes.types'

export const useBranchLocatorOption = (): [
	BranchesLocator,
	(BranchesLocator) => void
] => {
	return useThisWidgetOption<BranchesLocator>('branchLocator', {
		default: true,
	})
}

// FIXME: without it IDE cannot parse the code for some reason
type MaybeBuildTypeId = ?BuildTypeId

export const useBuildTypeIdOption = (): [
	MaybeBuildTypeId,
	(MaybeBuildTypeId) => void
] => {
	return useThisWidgetOption<?BuildTypeId>('buildTypeId')
}

export const useAreAllExpanded = (): [boolean, (boolean) => void] => {
	return useThisWidgetState<boolean>('areAllExpanded', true)
}
