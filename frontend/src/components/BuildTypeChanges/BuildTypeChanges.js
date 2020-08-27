// @flow strict
import React from 'react'
import BuildChanges from '../../features/builds/components/BuildChanges/BuildChanges'
import type { BranchesLocator } from '../../features/branches/branches.locator'
import TC from '@teamcity/react-api'
import type { BuildsLocator } from '../../features/builds/builds.locator'
import { stringifyBuildsLocator } from '../../features/builds/builds.locator'
import { useBuildTypeConstants } from '../../features/buildTypes/buildTypesConstants.hooks'
import BuildTypePendingChanges from '../../features/changes/components/BuildTypePendingChanges/BuildTypePendingChanges'
import type { BuildTypeId } from '../../features/buildTypes/buildTypes.types'
import NoBuildsMessage from '../NoBuildsMessage/NoBuildsMessage'

import styles from './BuildTypeChanges.css'

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

	return (
		<div className={styles.BuildTypeChanges}>
			<BuildTypePendingChanges
				buildTypeId={buildTypeId}
				branch={branch}
			/>
			{buildType && (
				<BuildsList
					locator={stringifyBuildsLocator(locator)}
					buildTypeId={buildTypeId}
					buildTypeInternalId={buildType.internalId}
					withRunningAndQueued
					renderEachBuild={(build) => (
						<BuildChanges key={build.id} buildId={build.id} />
					)}
					emptyListPlaceholder={<NoBuildsMessage />}
				/>
			)}
		</div>
	)
}

export default BuildTypeChanges
