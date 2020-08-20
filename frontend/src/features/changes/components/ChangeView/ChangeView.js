// @flow strict
import React, { useCallback } from 'react'
import classNames from 'classnames'
import type { ChangeId } from '../../changes.slice'
import { useChange } from '../../changes.hooks'
import FormattedDate from '../../../../components/FormattedDate/FormattedDate'
import styles from './styles.css'
import FilesIcon from '../../../../resources/svg/files.svg'
import Button from '@jetbrains/ring-ui/components/button/button'

interface Properties {
	changeId: ChangeId;
	showChangeDetailsPopup: (?ChangeId) => mixed;
	className?: string,
}

const ChangeView = ({ changeId, showChangeDetailsPopup, className }: Properties) => {
	const change = useChange(changeId)

	const showPopup = useCallback(() => showChangeDetailsPopup(changeId), [
		changeId,
		showChangeDetailsPopup,
	])

	return (
		<div className={classNames(styles.ChangeView, className ?? '')}>
			<span className={styles.comment}>
				{change ? change.comment : 'Loading...'}
			</span>
			<span className={styles.changesPreviewIcon}>
				<Button
					icon={FilesIcon}
					onClick={showPopup}
					className={styles.changesPreviewInnerButton}
				/>
			</span>
			{change ? (
				<span className={styles.metadata}>
					{change.username}, <FormattedDate date={change.date} />
				</span>
			) : (
				<span>Loading..</span>
			)}
		</div>
	)
}

export default ChangeView
