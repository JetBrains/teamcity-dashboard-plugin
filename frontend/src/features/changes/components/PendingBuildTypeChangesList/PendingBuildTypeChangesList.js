// @flow strict
import React from 'react'
import type { BuildTypeId } from '../../../../hooks/TC/schemata'
import {
	usePendingBuildTypeChanges,
	usePendingBuildTypeChangesIds,
	usePendingBuildTypeChangesIdsWithSubscription,
} from '../../changes.hooks'
import ChangesList from '../ChangesList/ChangesList'
import type { BranchesLocator } from '../../../branches/branches.locator'

interface Properties {
	buildTypeId: BuildTypeId;
	branch: BranchesLocator;
}

const PendingBuildTypeChangesList = React.memo<Properties>(
	({ buildTypeId, branch }: Properties) => {
		const [changesIds] = usePendingBuildTypeChangesIdsWithSubscription(
			buildTypeId,
			branch
		)
		return changesIds ? (
			<ChangesList changesIds={changesIds} />
		) : (
			<span>Loading...</span>
		)
	}
)

PendingBuildTypeChangesList.displayName = 'PendingBuildTypeChangesList'

export default PendingBuildTypeChangesList
