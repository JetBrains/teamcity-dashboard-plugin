// @flow strict
import React from 'react'
import type { BuildId } from '../../builds.types'
import TC from '@teamcity/react-api'
import BuildAgentIcon from '../BuildAgentIcon/BuildAgentIcon'
import { useBuild, useRunningBuildProgress } from '../../builds.hooks'
import BuildTimeProperties from './BuildTimeProperties/BuildTimeProperties'

import styles from './BuildInfo.css'

const {
	BuildBranch,
	BuildArtifacts,
	BuildStatusLink,
	ChangesDropdown,
	RunningBuildUpdater,
} = TC.Components

interface Properties {
	buildId: BuildId;
}

const BuildInfo = ({ buildId }: Properties) => {
	const build = useBuild(buildId)

	const progress = useRunningBuildProgress(buildId)

	return (
		<div className={styles.BuildInfo}>
			{build?.state === 'running' && (
				<RunningBuildUpdater buildId={buildId} />
			)}
			{build?.state === 'running' && (
				<div
					className={styles.progress}
					style={{ width: `${progress ?? 0}%` }}
				/>
			)}
			<div className={styles.buildInfoContainer}>
				<div className={styles.statusContainer}>
					<BuildStatusLink buildId={buildId} />
				</div>
				<div className={styles.artifactsContainer}>
					<BuildArtifacts buildId={buildId} />
				</div>
				<div className={styles.numberAndTimePropertiesContainer}>
					<span>{buildId}</span>
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
