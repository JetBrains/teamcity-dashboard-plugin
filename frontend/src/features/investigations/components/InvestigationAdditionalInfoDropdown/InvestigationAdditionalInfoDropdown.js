// @flow strict
import React from 'react'
import Icon from '@jetbrains/ring-ui/components/icon/icon'
import Popup from '@jetbrains/ring-ui/components/popup/popup'
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown'
import InvestigationAdditionalInfo from './InvestigationAdditionalInfo/InvestigationAdditionalInfo'
import PopupMenu from '@jetbrains/ring-ui/components/popup-menu/popup-menu'
import { useSelector } from 'react-redux'
import styles from './InvestigationAdditionalInfoDropdown.css'
import type { InvestigationId } from '../../investigations.types'
import { selectInvestigationState } from '../../investigations.slice'
import okIcon from '@jetbrains/icons/ok.svg'
import infoIcon from '@jetbrains/icons/info.svg'

interface Properties {
	investigationId: InvestigationId;
}

const directions = [
	PopupMenu.PopupProps.Directions.BOTTOM_RIGHT,
	PopupMenu.PopupProps.Directions.BOTTOM_LEFT,
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
					<Icon glyph={okIcon} color="green" />
				) : (
					<Icon glyph={infoIcon} className={styles.grayIcon} />
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
