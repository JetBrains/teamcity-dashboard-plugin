// @flow strict
import React from 'react'
import type { BuildId } from '../../builds.types'
import TC from '@teamcity/react-api'
import BuildAgentIcon from '../BuildAgentIcon/BuildAgentIcon'
import { useBuild, useRunningBuildProgress } from '../../builds.hooks'
import BuildTimeProperties from './BuildTimeProperties/BuildTimeProperties'

import styles from './BuildInfo.css'
import MultilineBuildStatusLink from '../MultilineBuildStatusLink/MultilineBuildStatusLink'
import RunningBuildProgressBar from './RunningBuildProgressBar/RunningBuildProgressBar'

const {
	BuildBranch,
	BuildArtifacts,
	ChangesDropdown,
	RunningBuildUpdater,
	BuildNumber,
} = TC.Components

interface Properties {
	buildId: BuildId;
}

const BuildInfo = ({ buildId }: Properties) => {
	const build = useBuild(buildId)

	return (
		<div className={styles.BuildInfo}>
			{build?.state === 'running' && (
				<RunningBuildUpdater buildId={buildId} />
			)}
			{build?.state === 'running' && (
				<RunningBuildProgressBar
					buildId={buildId}
					className={styles.progress}
				/>
			)}
			<div className={styles.buildInfoContainer}>
				<div className={styles.statusContainer}>
					<MultilineBuildStatusLink buildId={buildId} />
				</div>
				<div className={styles.artifactsContainer}>
					<BuildArtifacts buildId={buildId} />
				</div>
				<div className={styles.numberAndTimePropertiesContainer}>
					<BuildNumber buildId={buildId} hideStar />
					<BuildTimeProperties buildId={buildId} />
				</div>
				<div className={styles.branchContainer}>
					<BuildBranch buildId={buildId} />
				</div>
				<div className={styles.agentAndChangesContainer}>
					<BuildAgentIcon
						buildId={buildId}
						className={styles.agent}
					/>
					<ChangesDropdown
						buildId={buildId}
						className={styles.changes}
					/>
				</div>
			</div>
		</div>
	)
}

export default BuildInfo
