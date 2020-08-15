// @flow strict
import React, { useCallback } from 'react'
import { useThisWidgetTopLevelState } from '../../../features/widgets/widgets.hooks'
import type { ChangeDetailsPopupState } from './TopLevelChangeDetailsPopup.types'
import TC from '@teamcity/react-api'

const { ChangeDetailsPopup } = TC.Components

const TopLevelChangeDetailsPopup = () => {
	const [
		popupState,
		setPopupState,
	] = useThisWidgetTopLevelState<ChangeDetailsPopupState>(
		'changeDetailsPopupState',
		{}
	)

	const { buildTypeId, targetChangeId } = popupState

	const closePopup = useCallback(() => setPopupState({}), [setPopupState])

	return (
		<ChangeDetailsPopup
			buildTypeId={buildTypeId}
			targetChangeId={targetChangeId}
			show={targetChangeId !== null && targetChangeId !== undefined}
			cancelDialog={closePopup}
		/>
	)
}

export default TopLevelChangeDetailsPopup
