// @flow strict
import React from 'react'
import type { BuildId } from '../../builds.types'
import TC from '@teamcity/react-api'
import BuildAgentIcon from '../BuildAgentIcon/BuildAgentIcon'
import { useBuild } from '../../builds.hooks'
import BuildTimeProperties from './BuildTimeProperties/BuildTimeProperties'

import styles from './BuildInfo.css'
import RunningBuildProgressBar from './RunningBuildProgressBar/RunningBuildProgressBar'
import BuildStatusLink from '../BuildStatusLink/BuildStatusLink'

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

	const isBuildComposite = build?.composite === true

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
					<BuildStatusLink buildId={buildId} multiline />
				</div>
				<div className={styles.artifactsContainer}>
					<BuildArtifacts buildId={buildId} />
				</div>
				<div className={styles.secondRow}>
					<BuildNumber
						className={styles.buildNumber}
						buildId={buildId}
						hideStar
					/>
					<BuildTimeProperties
						buildId={buildId}
						className={styles.time}
					/>
					{isBuildComposite && (
						<ChangesDropdown
							buildId={buildId}
							className={styles.changes}
						/>
					)}
				</div>
				<div className={styles.branchContainer}>
					<BuildBranch buildId={buildId} className={styles.branch} />
				</div>
				{!isBuildComposite && (
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
				)}
			</div>
		</div>
	)
}

export default BuildInfo
