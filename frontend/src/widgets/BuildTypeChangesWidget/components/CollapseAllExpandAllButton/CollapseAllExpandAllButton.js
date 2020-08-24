// @flow strict
import React from 'react'
import classNames from 'classnames'
import Button from '@jetbrains/ring-ui/components/button/button'
import { useAreAllExpanded } from '../../options/hooks'
import useToggle from '../../../../hooks/basic/useToggle'

import collapseIcon from '../../../../resources/svg/collapse.svg'
import styles from './CollapseAllExpandAllButton.css'

interface Properties {
	className?: ?string;
}

const CollapseAllExpandAllButton = React.memo<Properties>(
	({ className }: Properties) => {
		const [areAllExpanded, setAreAllExpanded] = useAreAllExpanded()

		const toggle = useToggle(areAllExpanded, setAreAllExpanded)

		return (
			<Button
				icon={collapseIcon}
				onClick={toggle}
				className={classNames(
					styles.CollapseAllExpandAllButton,
					{
						[styles.rotated]: areAllExpanded,
					},
					className
				)}
				iconClassName={styles.icon}
			/>
		)
	}
)

CollapseAllExpandAllButton.displayName = 'CollapseAllExpandAllButton'

export default CollapseAllExpandAllButton
