// @flow strict
import React, { useCallback } from 'react'
import classnames from 'classnames'
import type { ChangeId } from '../../changes.types'
import Button from '@jetbrains/ring-ui/components/button/button'
import FilesIcon from '../../../../resources/svg/files.svg'
import { useChangeFilesCount } from '../../changes.hooks'
import { Icon } from '@jetbrains/ring-ui'

import styles from './ChangeFilesDetailsButton.css'

type Properties = {|
	changeId: ChangeId,
	showChangeDetailsPopup: (?ChangeId) => mixed,
	className?: string,
|}

const ChangeFilesDetailsButton = ({
	changeId,
	className,
	showChangeDetailsPopup,
}: Properties) => {
	const showPopup = useCallback(() => showChangeDetailsPopup(changeId), [
		changeId,
		showChangeDetailsPopup,
	])

	const filesCount = useChangeFilesCount(changeId)

	const readableFilesCount = filesCount > 100 ? '`100+' : `${filesCount}`

	const buttonClasses = classnames(styles.ChangeFilesDetailsButton, className)

	return (
		<Button
			onClick={showPopup}
			title="Open Change Details"
			text
			className={buttonClasses}
		>
			{readableFilesCount}
			<Icon glyph={FilesIcon} className={styles.icon} />
		</Button>
	)
}

export default ChangeFilesDetailsButton
