// @flow strict
import React from 'react'
import type { BuildId } from '../../../builds.types'
import TC from '@teamcity/react-api'

import styles from './MultilineBuildStatusLink.css'
import { useBuildStatusLink } from '../../../builds.hooks'
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown'
import Popup from '@jetbrains/ring-ui/components/popup/popup'
import classnames from 'classnames'
import ClampedText from '../../../../../components/ClampedText/ClampedText'
import Link from '@jetbrains/ring-ui/components/link/link'

const { Icon, BuildStatusTooltip } = TC.Components

interface Properties {
	buildId: BuildId;
	className?: string;
	maxLines?: number;
}

const MultilineBuildStatusLink = ({
	buildId,
	className,
	maxLines = 3,
}: Properties) => {
	const { icon, statusText, statusType, href } = useBuildStatusLink(buildId)

	const classes = classnames(styles.link, className, styles[statusType])
	const popupClasses = classnames(styles.popup, 'popupDiv')

	const iconDiv =
		icon !== null && icon !== undefined ? (
			<div className={styles.icon}>
				<Icon name={icon} />
			</div>
		) : // eslint-disable-next-line unicorn/no-null
		null

	return (
		<ClampedText maxLines={maxLines} className={styles[statusType]}>
			<Dropdown anchor={iconDiv} hoverMode clickMode={false}>
				<Popup className={popupClasses}>
					<BuildStatusTooltip buildId={buildId} />
				</Popup>
			</Dropdown>
			<Link className={classes} href={href ?? '#'}>
				{statusText}
			</Link>
		</ClampedText>
	)
}

export default MultilineBuildStatusLink
