// @flow strict
import React, { useCallback, useState } from 'react'
import type { BuildTypeId } from '../../hooks/TC/schemata'
import {
	useBuildTypeBuildsIds,
	useBuildTypeBuildsIdsWithSubscription,
} from '../../features/builds/builds.hooks'
import { usePendingBuildTypeChanges } from '../../features/changes/changes.hooks'
import ChangeView from '../../features/changes/components/ChangeView/ChangeView'
import BuildChanges from '../../features/builds/components/BuildChanges/BuildChanges'
import type { BranchesLocator } from '../../features/branches/branches.locator'
import PendingBuildTypeChangesList from '../../features/changes/components/BuildTypePendingChanges/PendingBuildTypeChangesList/PendingBuildTypeChangesList'
import TC from '@teamcity/react-api'
import type { BuildsLocator } from '../../features/builds/builds.locator'
import { stringifyBuildsLocator } from '../../features/builds/builds.locator'
import { useBuildTypeConstants } from '../../features/buildTypes/buildTypesConstants.hooks'
import CollapseChangesList from '../../widgets/BuildTypeChangesWidget/components/CollapseChangesList/CollapseChangesList'
import BuildTypePendingChanges from '../../features/changes/components/BuildTypePendingChanges/BuildTypePendingChanges'

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
		<div>
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
					renderEachBuild={(id) => (
						<BuildChanges key={id} buildId={id} />
					)}
				/>
			)}
		</div>
	)
}

export default BuildTypeChanges
