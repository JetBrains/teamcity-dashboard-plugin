// @flow strict
import React from 'react'
import type { BuildId } from '../../builds.types'

import TC from '@teamcity/react-api'

const {
	useRunningBuildLeftSeconds,
	useRunningBuildProgress,
	useRunningBuildOvertime,
} = TC.hooks

const { RunningBuildUpdater } = TC.Components

interface Properties {
	buildId: BuildId;
}

const RunningBuild = ({ buildId }: Properties) => {
	const leftSeconds = useRunningBuildLeftSeconds(buildId)
	const progress = useRunningBuildProgress(buildId)
	const overtime = useRunningBuildOvertime(buildId)

	return (
		<>
			<RunningBuildUpdater buildId={buildId} />
			<span>Left: {leftSeconds ?? 'null'} </span>
			<span>Progress: {progress ?? 'null'} </span>
			<span>Overtime: {overtime ?? 'null'} </span>
		</>
	)
}

export default RunningBuild
