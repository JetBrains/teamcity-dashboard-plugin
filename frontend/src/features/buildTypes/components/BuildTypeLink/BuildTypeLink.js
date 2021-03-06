// @flow strict
import React from 'react'
import classNames from 'classnames'
import type { BuildTypeId } from '../../buildTypes.types'
import BuildTypeStatusIcon from './BuildTypeStatusIcon/BuildTypeStatusIcon'
import BuildTypeName from './BuildTypeName/BuildTypeName'

import styles from './BuildTypeLink.css'
import ClampedText from '../../../../components/ClampedText/ClampedText'
import { getBuildTypeLinkHref } from '../../buildTypes.utils'

type Properties = {|
	buildTypeId: BuildTypeId,
	href?: ?string,
	className?: ?string,
	multiline?: ?boolean,
|}

const BuildTypeLink = React.memo<Properties>(
	({ buildTypeId, className, multiline = false, href }: Properties) => {
		return multiline === true ? (
			<ClampedText maxLines={5}>
				<span className={classNames(styles.BuildTypeLink, className)}>
					<BuildTypeStatusIcon buildTypeId={buildTypeId} />
					<BuildTypeName
						buildTypeId={buildTypeId}
						className={classNames(styles.buildTypeName, {
							[styles.oneLine]: !multiline,
						})}
						href={href ?? getBuildTypeLinkHref(buildTypeId)}
					/>
				</span>
			</ClampedText>
		) : (
			<span
				className={classNames(
					styles.BuildTypeLink,
					styles.oneLine,
					className
				)}
			>
				<BuildTypeStatusIcon buildTypeId={buildTypeId} />
				<BuildTypeName
					buildTypeId={buildTypeId}
					className={classNames(styles.buildTypeName, {
						[styles.oneLine]: !multiline,
					})}
					href={href ?? getBuildTypeLinkHref(buildTypeId)}
				/>
			</span>
		)
	}
)

BuildTypeLink.displayName = 'BuildTypeLink'

export default BuildTypeLink
