// @flow strict
import React from 'react'
import { MoreOptionsIcon } from '@jetbrains/ring-ui/components/icon'
import PopupMenu from '@jetbrains/ring-ui/components/popup-menu/popup-menu'
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown'
import TC from '@teamcity/react-api'
import type { InvestigationState } from '../../../../store/slices/investigationsSlice'
import type { UserId } from '../../../../commontypes'
import Popup from '@jetbrains/ring-ui/components/popup/popup'

const { IconButton } = TC.Components

interface Properties {
	state: InvestigationState;
	assignedBy: UserId;
	date: Date;
}

const directions = [
	PopupMenu.PopupProps.Directions.BOTTOM_LEFT,
	PopupMenu.PopupProps.Directions.TOP_LEFT,
	PopupMenu.PopupProps.Directions.BOTTOM_RIGHT,
	PopupMenu.PopupProps.Directions.TOP_RIGHT,
]

const InvestigationInfoDropdown = React.memo<Properties>(
	({ state, assignedBy, date }: Properties) => {
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
					<span>{state}</span>
					<span>{assignedBy}</span>
					<span>{date.toString()}</span>
				</Popup>
			</Dropdown>
		)
	}
)

InvestigationInfoDropdown.displayName = 'InvestigationInfoDropdown'

export default InvestigationInfoDropdown
