// @flow strict
import { useCallback } from 'react'
import { useThisWidgetTopLevelState } from '../../../features/widgets/widgets.hooks'
import type { ChangeDetailsPopupState } from './TopLevelChangeDetailsPopup.types'
import type { BuildTypeId } from '../../../features/buildTypes/buildTypesConstants.types'
import type { ChangeId } from '../../../features/changes/changes.slice'
import { useBuildTypeIdOption } from '../options/hooks'
import noop from '../../../utils/noop'

export const useChangeDetailsPopupState = (): ChangeDetailsPopupState => {
	const [popupState] = useThisWidgetTopLevelState<ChangeDetailsPopupState>(
		'changeDetailsPopupState',
		{}
	)
	return popupState
}

export const useOpenChangeDetailsPopup = (
	buildTypeId: BuildTypeId,
	targetChangeId: ChangeId
): (() => void) => {
	const [
		// eslint-disable-next-line no-unused-vars
		_,
		setPopupState,
	] = useThisWidgetTopLevelState<ChangeDetailsPopupState>(
		'changeDetailsPopupState',
		{}
	)
	return useCallback(() => setPopupState({ buildTypeId, targetChangeId }), [
		buildTypeId,
		setPopupState,
		targetChangeId,
	])
}

export const useCloseChangeDetailsPopup = (): (() => void) => {
	const [
		// eslint-disable-next-line no-unused-vars
		_,
		setPopupState,
	] = useThisWidgetTopLevelState<ChangeDetailsPopupState>(
		'changeDetailsPopupState',
		{}
	)
	return useCallback(() => setPopupState({}), [setPopupState])
}

export const useOpenThisWidgetChangeDetailsPopup = (
	targetChangeId: ChangeId
): (() => void) => {
	const [buildTypeId] = useBuildTypeIdOption()
	const openPopup = useOpenChangeDetailsPopup(
		buildTypeId ?? ' ',
		targetChangeId
	)
	return buildTypeId !== undefined && buildTypeId !== null ? openPopup : noop
}
