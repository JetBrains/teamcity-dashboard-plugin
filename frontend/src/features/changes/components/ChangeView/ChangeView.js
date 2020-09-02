// @flow strict
import React from 'react'
import classNames from 'classnames'
import { useChange } from '../../changes.hooks'
import FormattedDate from '../../../../components/FormattedDate/FormattedDate'
import styles from './ChangeView.css'
import ClampedText from '../../../../components/ClampedText/ClampedText'
import Link from '@jetbrains/ring-ui/components/link/link'
import getUserDisplayName from '../../../../api/user/getUserDisplayName'
import type { Change, ChangeId } from '../../changes.types'
import ChangeFilesDetailsButton from '../ChangeFilesDetailsButton/ChangeFilesDetailsButton'
import { useActiveBreakpointClassNames } from '../../../widgets/widgetsBreakpoints.hooks'

const getChangeUserDisplayName = (change: Change): string => {
	const { username: vcsUsername, user } = change
	if (user === undefined || user === null) {
		return vcsUsername
	} else {
		return getUserDisplayName(user)
	}
}

interface Properties {
	changeId: ChangeId;
	showChangeDetailsPopup: (?ChangeId) => mixed;
	className?: string;
}

const changeViewBreakpointClasses = {
	medium: styles.ChangeView_medium,
}

const ChangeView = ({
	changeId,
	showChangeDetailsPopup,
	className,
}: Properties) => {
	const change = useChange(changeId)

	const changeViewOwnClasses = useActiveBreakpointClassNames(
		changeViewBreakpointClasses,
		styles.ChangeView
	)

	const changeViewClasses = classNames(changeViewOwnClasses, className)

	return (
		<div className={changeViewClasses}>
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
			{change ? (
				<div className={styles.metadata}>
					<span className={styles.username}>
						{getChangeUserDisplayName(change)},
					</span>
					<span className={styles.date}>
						<FormattedDate date={change.date} />
					</span>
				</div>
			) : (
				<span>Loading..</span>
			)}
			<span className={styles.changesPreviewIconContainer}>
				<ChangeFilesDetailsButton
					changeId={changeId}
					className={styles.changesPreviewButton}
					showChangeDetailsPopup={showChangeDetailsPopup}
				/>
			</span>
		</div>
	)
}

export default ChangeView
