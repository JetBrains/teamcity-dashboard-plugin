// @flow strict
import React from 'react'
import classNames from 'classnames'
import type { BuildTypeId } from '../../buildTypes.types'
import BuildTypeStatusIcon from './BuildTypeStatusIcon/BuildTypeStatusIcon'
import BuildTypeName from './BuildTypeName/BuildTypeName'

import styles from './BuildTypeLink.css'

interface Properties {
	buildTypeId: BuildTypeId;
	className?: ?string;
}

const BuildTypeLink = React.memo<Properties>(
	({ buildTypeId, className }: Properties) => {
		return (
			<span className={classNames(styles.BuildTypeLink, className)}>
				<BuildTypeStatusIcon buildTypeId={buildTypeId} />
				<BuildTypeName
					buildTypeId={buildTypeId}
					className={styles.buildTypeName}
				/>
			</span>
		)
	}
)

BuildTypeLink.displayName = 'BuildTypeLink'

export default BuildTypeLink
