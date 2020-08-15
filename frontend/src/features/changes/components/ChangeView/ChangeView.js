// @flow strict
import React from 'react'
import type { ChangeId } from '../../changes.slice'
import { useChange } from '../../changes.hooks'
import FormattedDate from '../../../../components/FormattedDate/FormattedDate'
import styles from './styles.css'
import { useOpenThisWidgetChangeDetailsPopup } from '../../../../widgets/BuildTypeChangesWidget/TopLevelChangeDetailsPopup/TopLevelChangeDetailsPopup.hooks'
import OpenChangeDetailsPopupButton from '../../../../widgets/BuildTypeChangesWidget/OpenChangeDetailsPopupButton'

interface Properties {
	changeId: ChangeId;
}

const ChangeView = ({ changeId }: Properties) => {
	const change = useChange(changeId)

	return (
		<div className={styles.ChangeView}>
			<span className={styles.comment}>
				{change ? change.comment : 'Loading...'}
			</span>
			<span className={styles.username}>
				{change ? change.username : 'Loading...'}
			</span>
			<span className={styles.date}>
				{change ? <FormattedDate date={change.date} /> : 'Loading...'}
			</span>
			<span className={styles.changesPreviewIcon}>
				<OpenChangeDetailsPopupButton targetChangeId={changeId} />
			</span>
		</div>
	)
}

export default ChangeView
