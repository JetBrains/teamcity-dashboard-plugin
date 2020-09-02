// @flow strict
import React, { useState, useEffect } from 'react'
import type { ChangesLocator } from '../../../../features/changes/changes.locator'
import {
	ChevronDownIcon,
	ChevronRightIcon,
} from '@jetbrains/ring-ui/components/icon'
import ChangesCounter from '../../../../features/changes/components/ChangesCounter/ChangesCounter'
import { useAreAllExpanded } from '../../options/hooks'
import classNames from 'classnames'
import styles from './CollapseChangesList.css'
import useToggle from '../../../../hooks/basic/useToggle'
import Button from '@jetbrains/ring-ui/components/button/button'

type Properties = {|
	title?: React$Node,
	locator: ChangesLocator,
	extraNode?: React$Node,
	children: React$Node,
	compactChangesCount?: boolean,
	compact?: boolean,
|}

const CollapseChangesList = ({
	title,
	locator,
	extraNode,
	children,
	compact = false,
	compactChangesCount = false,
}: Properties) => {
	const [areAllExpanded] = useAreAllExpanded()

	const [isSelfExpanded, setIsSelfExpanded] = useState<boolean>(
		areAllExpanded
	)

	useEffect(() => {
		setIsSelfExpanded(areAllExpanded)
	}, [areAllExpanded])

	const toggleExpanded = useToggle(isSelfExpanded, setIsSelfExpanded)

	const contentClassNames = classNames(styles.content, {
		[styles.hidden]: !isSelfExpanded,
	})

	const headerClasses = classNames(styles.header, {
		[styles.header_compact]: compact,
	})

	const extraClasses = classNames(styles.extra, {
		[styles.extra_compact]: compact,
	})

	return (
		<div className={styles.CollapseChangesList}>
			<div className={headerClasses}>
				<Button
					icon={isSelfExpanded ? ChevronDownIcon : ChevronRightIcon}
					className={styles.chevronButton}
					iconClassName={styles.chevronButtonIcon}
					iconSize={20}
					onClick={toggleExpanded}
				/>
				<span className={styles.title}>{title}</span>
				<ChangesCounter
					locator={locator}
					compact={compactChangesCount}
					className={styles.changesCount}
				/>
				{extraNode !== undefined && extraNode !== null && (
					<span className={extraClasses}>{extraNode}</span>
				)}
			</div>
			<div className={contentClassNames}>{children}</div>
		</div>
	)
}

export default CollapseChangesList
