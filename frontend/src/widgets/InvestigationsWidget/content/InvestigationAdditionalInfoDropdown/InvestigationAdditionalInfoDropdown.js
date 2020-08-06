// @flow strict
import React from 'react'
import { MoreOptionsIcon } from '@jetbrains/ring-ui/components/icon'
import Popup from "@jetbrains/ring-ui/components/popup/popup"
import TC from '@teamcity/react-api'
import Dropdown from "@jetbrains/ring-ui/components/dropdown/dropdown"
import type { InvestigationId } from '../../../../store/slices/investigationsSlice'
import InvestigationAdditionalInfo from '../InvestigationAdditionalInfo/InvestigationAdditionalInfo'
import PopupMenu from "@jetbrains/ring-ui/components/popup-menu/popup-menu"

const { IconButton } = TC.Components

interface Properties {
	investigationId: InvestigationId
}

const directions = [
	PopupMenu.PopupProps.Directions.BOTTOM_LEFT,
	PopupMenu.PopupProps.Directions.TOP_LEFT,
	PopupMenu.PopupProps.Directions.BOTTOM_RIGHT,
	PopupMenu.PopupProps.Directions.TOP_RIGHT,
]

const InvestigationAdditionalInfoDropdown = ({ investigationId }: Properties) => {

	return (
		<Dropdown
			hoverMode
			anchor={
				<IconButton
					title="Investigation Info"
					icon={MoreOptionsIcon}
				/>
			}
		>
			<Popup directions={directions}>
				<InvestigationAdditionalInfo investigationId={investigationId} />
			</Popup>
		</Dropdown>
	)
}

export default InvestigationAdditionalInfoDropdown
