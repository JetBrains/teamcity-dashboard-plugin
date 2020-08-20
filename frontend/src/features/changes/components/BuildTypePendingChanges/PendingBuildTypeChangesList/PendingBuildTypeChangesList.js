// @flow strict
import React from 'react'
import {
	usePendingBuildTypeChangesIdsWithSubscription,
} from '../../../changes.hooks'
import ChangesList from '../../ChangesList/ChangesList'
import type { BranchesLocator } from '../../../../branches/branches.locator'
import type { BuildTypeId } from '../../../../buildTypes/buildTypes.types'

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
