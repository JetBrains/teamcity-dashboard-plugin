// @flow strict
import React, { useMemo } from 'react'
import type { BranchesLocator } from '../../../branches/branches.locator'
import CollapseChangesList from '../../../../widgets/BuildTypeChangesWidget/components/CollapseChangesList/CollapseChangesList'
import PendingBuildTypeChangesList from './PendingBuildTypeChangesList/PendingBuildTypeChangesList'
import type { BuildTypeId } from '../../../buildTypes/buildTypes.types'

interface Properties {
	buildTypeId: BuildTypeId;
	branch: BranchesLocator;
}

const BuildTypePendingChanges = ({ buildTypeId, branch }: Properties) => {
	const locator = useMemo(
		() => ({
			buildTypeId,
			branch,
		}),
		[branch, buildTypeId]
	)

	return (
		<CollapseChangesList
			title={('Pending': React$Node)}
			locator={locator}
		>
			<PendingBuildTypeChangesList
				buildTypeId={buildTypeId}
				branch={branch}
			/>
		</CollapseChangesList>
	)
}

export default BuildTypePendingChanges
