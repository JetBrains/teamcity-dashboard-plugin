// @flow strict
import React from 'react'
import type { BranchesLocator } from '../../../branches/branches.locator'
import CollapseChangesList from '../../../../widgets/BuildTypeChangesWidget/components/CollapseChangesList/CollapseChangesList'
import type { BuildTypeId } from '../../../buildTypes/buildTypes.types'
import {
	usePendingBuildTypeChangesIdsWithSubscription,
	usePendingBuildTypeChangesLocator,
} from '../../changes.hooks'
import ChangesList from '../ChangesList/ChangesList'

interface Properties {
	buildTypeId: BuildTypeId;
	branch: BranchesLocator;
}

const BuildTypePendingChanges = React.memo<Properties>(
	({ buildTypeId, branch }: Properties) => {
		const locator = usePendingBuildTypeChangesLocator(buildTypeId, branch)

		const [changesIds] = usePendingBuildTypeChangesIdsWithSubscription(
			buildTypeId,
			branch
		)

		return changesIds.length !== 0 ? (
			<CollapseChangesList
				title={('Pending': React$Node)}
				locator={locator}
			>
				{changesIds ? (
					<ChangesList changesIds={changesIds} />
				) : (
					<span>Loading...</span>
				)}
			</CollapseChangesList>
		) : // eslint-disable-next-line unicorn/no-null
		null
	}
)

BuildTypePendingChanges.displayName = 'BuildTypePendingChanges'

export default BuildTypePendingChanges
