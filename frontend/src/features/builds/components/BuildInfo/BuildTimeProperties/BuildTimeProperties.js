// @flow strict
import React from 'react'
import classnames from 'classnames'
import type { BuildId } from '../../../builds.types'
import { useBuildState } from '../../../builds.hooks'
import TC from '@teamcity/react-api'
import RunningBuildTimeProperties from './RunningBuildTimeProperties/RunningBuildTimeProperties'

import styles from './BuildTimeProperties.css'

const { BuildDuration } = TC.Components

type Properties = {|
	buildId: BuildId,
	className?: string,
|}

const BuildTimeProperties = React.memo<Properties>(
	({ buildId, className }: Properties) => {
		const buildState = useBuildState(buildId)
		return buildState !== null && buildState !== undefined ? (
			buildState === 'running' ? (
				<RunningBuildTimeProperties
					buildId={buildId}
					className={className}
				/>
			) : (
				<BuildDuration
					buildId={buildId}
					className={classnames(styles.buildDuration, className)}
					dropdownClassName={styles.dropdown}
				/>
			)
		) : (
			<span>Loading...</span>
		)
	}
)

BuildTimeProperties.displayName = 'BuildTimeProperties'

export default BuildTimeProperties
