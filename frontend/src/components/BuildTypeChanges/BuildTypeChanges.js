// @flow strict
import React, { useCallback, useState } from 'react'
import type { BuildTypeId } from '../../hooks/TC/schemata'
import {
	useBuildTypeBuildsIds, useBuildTypeBuildsIdsWithSubscription,
} from '../../features/builds/builds.hooks'
import { usePendingBuildTypeChanges } from '../../features/changes/changes.hooks'
import ChangeView from '../../features/changes/components/ChangeView/ChangeView'
import BuildChanges from '../../features/builds/components/BuildChanges/BuildChanges'
import type { BranchesLocator } from '../../features/branches/branches.locator'
import PendingBuildTypeChangesList
	from '../../features/changes/components/PendingBuildTypeChangesList/PendingBuildTypeChangesList'

interface Properties {
	buildTypeId: BuildTypeId;
	branch: BranchesLocator;
}

const BuildTypeChanges = ({ buildTypeId, branch }: Properties) => {
	// useSubscribeOnBuildTypeBuilds('project6', buildTypeId, 'bt8', branch)
	const [buildsIds] = useBuildTypeBuildsIdsWithSubscription(buildTypeId, branch)

	return (
		<div>
			<h2>Pending changes</h2>
			<PendingBuildTypeChangesList buildTypeId={buildTypeId} branch={branch} />
			{buildsIds.map((id) => (
				<BuildChanges key={id} buildId={id} />
			))}
		</div>
	)
}

export default BuildTypeChanges
