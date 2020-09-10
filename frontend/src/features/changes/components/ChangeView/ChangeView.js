// @flow strict
import React from 'react'
import classNames from 'classnames'
import {
	useChangeComment,
	useChangeDate,
	useChangeUserDisplayName,
	useChangeWebUrl,
} from '../../changes.hooks'
import FormattedDate from '../../../../components/FormattedDate/FormattedDate'
import styles from './ChangeView.css'
import ClampedText from '../../../../components/ClampedText/ClampedText'
import Link from '@jetbrains/ring-ui/components/link/link'
import type { ChangeId } from '../../changes.types'
import ChangeFilesDetailsButton from '../ChangeFilesDetailsButton/ChangeFilesDetailsButton'
import { useActiveBreakpointClassNames } from '../../../widgets/widgetsBreakpoints.hooks'

type Properties = {|
	changeId: ChangeId,
	showChangeDetailsPopup: (?ChangeId) => mixed,
	className?: string,
	withBottomBorder?: boolean,
|}

const changeViewBreakpointClasses = {
	medium: styles.ChangeView_medium,
}

const ChangeView = React.memo<Properties>(
	({ changeId, showChangeDetailsPopup, className, withBottomBorder = true }: Properties) => {
		const changeWebUrl = useChangeWebUrl(changeId)
		const changeComment = useChangeComment(changeId)
		const userDisplayName = useChangeUserDisplayName(changeId)
		const changeDate = useChangeDate(changeId)

		const changeViewOwnClasses = useActiveBreakpointClassNames(
			changeViewBreakpointClasses,
			styles.ChangeView
		)

		const changeViewClasses = classNames(changeViewOwnClasses, className, {
			[styles.ChangeView_withBottomBorder]: withBottomBorder,
		})

		return (
			<div className={changeViewClasses}>
				<span className={styles.comment}>
					<ClampedText maxLines={3}>
						{changeComment !== undefined &&
						changeComment !== null ? (
							changeWebUrl !== undefined &&
							changeWebUrl !== null ? (
								<Link
									href={changeWebUrl}
									className={styles.commentLink}
									active
								>
									{changeComment}
								</Link>
							) : (
								changeComment
							)
						) : (
							'Loading...'
						)}
					</ClampedText>
				</span>
				<div className={styles.metadata}>
					<span className={styles.username}>
						{userDisplayName !== null &&
						userDisplayName !== undefined
							? userDisplayName
							: 'Loading...'}
						,
					</span>
					<span className={styles.date}>
						{changeDate !== null && changeDate !== undefined && (
							<FormattedDate date={changeDate} />
						)}
					</span>
				</div>
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
)

ChangeView.displayName = 'ChangeView'

export default ChangeView
