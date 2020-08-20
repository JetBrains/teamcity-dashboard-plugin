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

interface Properties {
	title?: React$Node;
	locator: ChangesLocator;
	extraNode?: React$Node;
	children: React$Node;
	showChangesCount?: boolean;
}

const CollapseChangesList = ({
	title,
	locator,
	extraNode,
	children,
	showChangesCount = true,
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
		hidden: !isSelfExpanded,
	})

	return (
		<div className={styles.CollapseChangesList}>
			<div className={styles.header}>
				<span className={styles.chevron}>
					<Button
						icon={
							isSelfExpanded ? ChevronDownIcon : ChevronRightIcon
						}
						className={styles.chevronButton}
						iconClassName={styles.chevronButtonIcon}
						iconSize={20}
						onClick={toggleExpanded}
					/>
				</span>
				<span className={styles.headerPanel}>
					<span className={styles.title}>{title}</span>
					{showChangesCount && (
						<span className={styles.changesCount}>
							<ChangesCounter locator={locator} />
						</span>
					)}
				</span>
				{extraNode !== undefined && extraNode !== null && (
					<span className={styles.extra}>{extraNode}</span>
				)}
			</div>
			<div className={contentClassNames}>{children}</div>
		</div>
	)
}

export default CollapseChangesList
