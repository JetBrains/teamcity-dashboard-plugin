// @flow strict
import React, { useMemo } from 'react'
import classnames from 'classnames'
import type { BuildId } from '../../../builds.types'
import {
	useBuildStatusType,
	useRunningBuildProgress,
} from '../../../builds.hooks'

import styles from './RunningBuildProgressBar.css'

type Properties = {|
	+buildId: BuildId,
	+className?: string,
|}

const RunningBuildProgressBar = ({ buildId, className }: Properties) => {
	const progress = useRunningBuildProgress(buildId)
	const statusType = useBuildStatusType(buildId)

	const classes = classnames(
		styles.RunningBuildProgressBar,
		className,
		styles[statusType]
	)

	const style = useMemo(() => ({ width: `${progress ?? 0}%` }), [progress])

	return <div className={classes} style={style} />
}

export default RunningBuildProgressBar
