// @flow strict
import React from 'react'
import type { BuildId } from '../../builds.types'
import TC from '@teamcity/react-api'
import BuildAgentIcon from '../BuildAgentIcon/BuildAgentIcon'
import { useBuild } from '../../builds.hooks'
import RunningBuild from './RunningBuild'

const {
	BuildDuration,
	BuildBranch,
	BuildArtifacts,
	BuildStatusLink,
	ChangesDropdown,
} = TC.Components

interface Properties {
	buildId: BuildId;
}

const BuildInfo = ({ buildId }: Properties) => {
	const build = useBuild(buildId)

	return (
		<div>
			<div>
				<span>{buildId}</span>
				<BuildArtifacts buildId={buildId} />
				<BuildDuration buildId={buildId} subscribe />
				{/*<BuildStartedTimeAgo buildId={buildId} />*/}
				{build?.state === 'running' && <RunningBuild buildId={buildId} />}
			</div>
			<div>
				<BuildStatusLink buildId={buildId} />
			</div>
			<div>
				<BuildAgentIcon buildId={buildId} />
				<ChangesDropdown buildId={buildId} />
				<BuildBranch buildId={buildId} />
			</div>
		</div>
	)
}

export default BuildInfo
