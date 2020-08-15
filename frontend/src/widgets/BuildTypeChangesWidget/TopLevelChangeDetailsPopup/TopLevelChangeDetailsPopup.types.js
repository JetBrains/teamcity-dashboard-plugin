// @flow strict
import type { BuildTypeId } from '../../../features/buildTypes/buildTypesConstants.types'
import type { ChangeId } from '../../../features/changes/changes.slice'

export type ChangeDetailsPopupState = $Shape<{|
	buildTypeId: BuildTypeId,
	targetChangeId: ChangeId,
|}>
