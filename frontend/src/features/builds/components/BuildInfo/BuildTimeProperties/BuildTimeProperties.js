// @flow strict
import React from 'react'
import type { BuildId } from '../../../builds.types'
import { useBuild } from '../../../builds.hooks'
import TC from '@teamcity/react-api'
import RunningBuildTimeProperties from './RunningBuildTimeProperties/RunningBuildTimeProperties'

const { BuildDuration } = TC.Components

interface Properties {
	buildId: BuildId;
}

const BuildTimeProperties = ({ buildId }: Properties) => {
	const build = useBuild(buildId)
	return build ? (
		<div>
			{build.state === 'running' && (
				<RunningBuildTimeProperties buildId={buildId} />
			)}
			{build.state !== 'running' && <BuildDuration buildId={buildId} />}
		</div>
	) : (
		<span>Loading...</span>
	)
}

export default BuildTimeProperties
