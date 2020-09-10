// @flow strict
import React from 'react'
import classnames from 'classnames'
import type { BuildId } from '../../builds.types'
import TC from '@teamcity/react-api'
import BuildAgentIcon from '../BuildAgentIcon/BuildAgentIcon'
import { useBuildState, useIsBuildComposite } from '../../builds.hooks'
import BuildTimeProperties from './BuildTimeProperties/BuildTimeProperties'

import styles from './BuildInfo.css'
import RunningBuildProgressBar from './RunningBuildProgressBar/RunningBuildProgressBar'
import BuildStatusLink from '../BuildStatusLink/BuildStatusLink'
import {
	useActiveBreakpointClassNames,
	useIsBreakpointActive,
} from '../../../widgets/widgetsBreakpoints.hooks'

const {
	BuildBranch,
	BuildArtifacts,
	ChangesDropdown,
	RunningBuildUpdater,
	BuildNumber,
} = TC.Components

const buildInfoContainerBreakpointClasses = {
	medium: styles.buildInfoContainerMedium,
}

const secondaryInfoContainerBreakpointClasses = {
	large: styles.secondaryInfoContainerLarge,
}

const branchContainerBreakpointClasses = {
	large: styles.branchContainerLarge,
}

const changesBreakpointClasses = {
	large: styles.changesLarge,
}

const agentBreakpointClasses = {
	large: styles.agentLarge,
}

type Properties = {|
	buildId: BuildId,
	withBottomBorder?: boolean,
|}

const BuildInfo = React.memo<Properties>(
	({ buildId, withBottomBorder = true }: Properties) => {
		const buildState = useBuildState(buildId)

		const isBuildComposite = useIsBuildComposite(buildId)

		const isMedium = useIsBreakpointActive('medium')

		const isLarge = useIsBreakpointActive('large')

		const buildInfoContainerOwnClasses = classnames(
			styles.buildInfoContainer, {
				[styles.buildInfoContainer_withBottomBorder]: withBottomBorder,
			}
		)

		const buildInfoContainerClasses = useActiveBreakpointClassNames(
			buildInfoContainerBreakpointClasses,
			buildInfoContainerOwnClasses
		)

		const secondaryInfoContainerClasses = useActiveBreakpointClassNames(
			secondaryInfoContainerBreakpointClasses,
			styles.secondaryInfoContainer
		)

		const branchContainerClasses = useActiveBreakpointClassNames(
			branchContainerBreakpointClasses,
			styles.branchContainer
		)

		const changesClasses = useActiveBreakpointClassNames(
			changesBreakpointClasses,
			styles.changes
		)

		const agentClasses = useActiveBreakpointClassNames(
			agentBreakpointClasses,
			styles.agent
		)

		return (
			<div className={styles.BuildInfo}>
				{buildState === 'running' && (
					<RunningBuildUpdater buildId={buildId} />
				)}
				{buildState === 'running' && (
					<RunningBuildProgressBar
						buildId={buildId}
						className={styles.progress}
					/>
				)}
				<div className={buildInfoContainerClasses}>
					<div className={styles.statusContainer}>
						{isLarge && (
							<BuildNumber
								className={styles.buildNumber}
								buildId={buildId}
								hideStar
							/>
						)}
						<BuildStatusLink
							buildId={buildId}
							multiline={!isLarge}
						/>
					</div>
					{isMedium && (
						<div className={styles.artifactsContainer}>
							<BuildArtifacts buildId={buildId} />
						</div>
					)}
					<div className={secondaryInfoContainerClasses}>
						<div className={styles.secondaryFirstRow}>
							{!isLarge && (
								<BuildNumber
									className={styles.buildNumber}
									buildId={buildId}
									hideStar
								/>
							)}
							<BuildTimeProperties
								buildId={buildId}
								className={styles.time}
							/>
							{isBuildComposite && !isLarge && (
								<ChangesDropdown
									buildId={buildId}
									className={changesClasses}
								/>
							)}
						</div>
						<div className={branchContainerClasses}>
							<BuildBranch
								buildId={buildId}
								className={styles.branch}
							/>
						</div>
						{(!isBuildComposite || isLarge) && (
							<div className={styles.agentAndChangesContainer}>
								{!isBuildComposite && (
									<BuildAgentIcon
										buildId={buildId}
										className={agentClasses}
									/>
								)}
								<ChangesDropdown
									buildId={buildId}
									className={changesClasses}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		)
	}
)

BuildInfo.displayName = 'BuildInfo'

export default BuildInfo
