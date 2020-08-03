// @flow strict
import React, {useMemo} from 'react'
import { MoreOptionsIcon } from '@jetbrains/ring-ui/components/icon'
import PopupMenu from "@jetbrains/ring-ui/components/popup-menu/popup-menu"
import Dropdown from "@jetbrains/ring-ui/components/dropdown/dropdown"
import TC from '@teamcity/react-api'
import type { InvestigationState } from '../../../store/slices/investigationsSlice'
import type { UserId } from '../../../commontypes'

const {IconButton} = TC.Components

interface Properties {
	state: InvestigationState,
	assignedBy: UserId,
	date: Date,
}

const directions = [
	PopupMenu.PopupProps.Directions.BOTTOM_LEFT,
	PopupMenu.PopupProps.Directions.TOP_LEFT,
	PopupMenu.PopupProps.Directions.BOTTOM_RIGHT,
	PopupMenu.PopupProps.Directions.TOP_RIGHT,
]


const InvestigationInfoDropdown = ({state, assignedBy, date}: Properties) => {

	const data = useMemo(() => [
		{label: `State: ${state}`},
		{label: `Assigned by ${assignedBy}`},
		{label: `Since: ${date.toString()}`}
	], [state, assignedBy, date])
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
			<PopupMenu closeOnSelect data={data} directions={directions} />
		</Dropdown>
	)
}

export default InvestigationInfoDropdown
