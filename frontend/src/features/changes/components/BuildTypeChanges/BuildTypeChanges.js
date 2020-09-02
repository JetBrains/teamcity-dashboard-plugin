// @flow strict
import React, { useMemo } from 'react'
import type { BranchesLocator } from '../../../branches/branches.locator'
import TC from '@teamcity/react-api'
import type { BuildsLocator } from '../../../builds/builds.locator'
import { stringifyBuildsLocator } from '../../../builds/builds.locator'
import { useBuildTypeConstants } from '../../../buildTypes/buildTypesConstants.hooks'
import BuildTypePendingChanges from '../BuildTypePendingChanges/BuildTypePendingChanges'
import type { BuildTypeId } from '../../../buildTypes/buildTypes.types'
import NoBuildsMessage from '../../../../components/NoBuildsMessage/NoBuildsMessage'

import styles from './BuildTypeChanges.css'
import BuildTypeChangesListItem from './BuildTypeChangesListItem/BuildTypeChangesListItem'
import type { Build } from '../../../builds/builds.types'
import CenteredLoader from '../../../../components/CenteredLoader/CenteredLoader'

const { BuildsList } = TC.Components

interface Properties {
	buildTypeId: BuildTypeId;
	branch: BranchesLocator;
}

const BuildTypeChanges = ({ buildTypeId, branch }: Properties) => {
	const buildType = useBuildTypeConstants(buildTypeId)

	const locator: BuildsLocator = {
		buildTypeId,
		branch,
		state: 'any',
	}

	const noBuildsMessage = useMemo(() => <NoBuildsMessage />, [])
	const loader = useMemo(() => <CenteredLoader />, [])

	return (
		<div className={styles.BuildTypeChanges}>
			<BuildTypePendingChanges
				buildTypeId={buildTypeId}
				branch={branch}
			/>
			{buildType && (
				<ol className={styles.buildsList}>
					<BuildsList
						locator={stringifyBuildsLocator(locator)}
						buildTypeId={buildTypeId}
						buildTypeInternalId={buildType.internalId}
						withRunningAndQueued
						renderEachBuild={(build: Build, index: number) => (
							<BuildTypeChangesListItem
								key={build.id}
								withDivider={index !== 0}
								buildId={build.id}
							/>
						)}
						emptyListPlaceholder={noBuildsMessage}
						loadingListPlaceholder={loader}
					/>
				</ol>
			)}
		</div>
	)
}

export default BuildTypeChanges
