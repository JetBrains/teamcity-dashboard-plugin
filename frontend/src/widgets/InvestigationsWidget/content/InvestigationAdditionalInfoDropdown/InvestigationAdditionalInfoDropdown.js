// @flow strict
import React from 'react'
import { OkIcon, InfoIcon } from '@jetbrains/ring-ui/components/icon'
import Popup from '@jetbrains/ring-ui/components/popup/popup'
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown'
import type { InvestigationId } from '../../../../store/slices/investigationsSlice'
import InvestigationAdditionalInfo from '../InvestigationAdditionalInfo/InvestigationAdditionalInfo'
import PopupMenu from '@jetbrains/ring-ui/components/popup-menu/popup-menu'
import { useSelector } from 'react-redux'
import { selectInvestigationState } from '../../../../store/slices/investigationsSlice'

interface Properties {
	investigationId: InvestigationId;
}

const directions = [
	PopupMenu.PopupProps.Directions.BOTTOM_LEFT,
	PopupMenu.PopupProps.Directions.TOP_LEFT,
	PopupMenu.PopupProps.Directions.BOTTOM_RIGHT,
	PopupMenu.PopupProps.Directions.TOP_RIGHT,
]

const InvestigationAdditionalInfoDropdown = ({
	investigationId,
}: Properties) => {
	const state = useSelector((state) =>
		selectInvestigationState(state, investigationId)
	)
	return (
		<Dropdown
			hoverMode
			anchor={
				state === 'FIXED' ? (
					<OkIcon color="green" />
				) : (
					<InfoIcon color="gray" />
				)
			}
		>
			<Popup directions={directions}>
				<InvestigationAdditionalInfo
					investigationId={investigationId}
				/>
			</Popup>
		</Dropdown>
	)
}

export default InvestigationAdditionalInfoDropdown
