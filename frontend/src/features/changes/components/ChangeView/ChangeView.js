// @flow strict
import React, { useCallback } from 'react'
import classNames from 'classnames'
import type { ChangeId } from '../../changes.slice'
import { useChange } from '../../changes.hooks'
import FormattedDate from '../../../../components/FormattedDate/FormattedDate'
import styles from './ChangeView.css'
import FilesIcon from '../../../../resources/svg/files.svg'
import Button from '@jetbrains/ring-ui/components/button/button'
import ClampedText from '../../../../components/ClampedText/ClampedText'
import { Link } from '@jetbrains/ring-ui'

interface Properties {
	changeId: ChangeId;
	showChangeDetailsPopup: (?ChangeId) => mixed;
	className?: string;
}

const ChangeView = ({
	changeId,
	showChangeDetailsPopup,
	className,
}: Properties) => {
	const change = useChange(changeId)

	const showPopup = useCallback(() => showChangeDetailsPopup(changeId), [
		changeId,
		showChangeDetailsPopup,
	])

	return (
		<div className={classNames(styles.ChangeView, className ?? '')}>
			<span className={styles.comment}>
				<ClampedText maxLines={3}>
					{change ? (
						change.webUrl !== undefined &&
						change.webUrl !== null ? (
							<Link href={change.webUrl} active>
								{change.comment}
							</Link>
						) : (
							change.comment
						)
					) : (
						'Loading...'
					)}
				</ClampedText>
			</span>
			<span className={styles.changesPreviewIcon}>
				<Button
					icon={FilesIcon}
					onClick={showPopup}
					title="Open Change Details"
					className={styles.changesPreviewInnerButton}
				/>
			</span>
			{change ? (
				<div className={styles.metadata}>
					<span className={styles.username}>{change.username},</span>
					<span className={styles.date}>
						<FormattedDate date={change.date} />
					</span>
					{/*{change.username}, <FormattedDate date={change.date} />*/}
				</div>
			) : (
				<span>Loading..</span>
			)}
		</div>
	)
}

export default ChangeView
