// @flow strict
import React, { useMemo } from 'react'
import type { BuildTypeId } from '../../../buildTypes/buildTypesConstants.types'
import type { BranchesLocator } from '../../../branches/branches.locator'
import CollapseChangesList from '../../../../widgets/BuildTypeChangesWidget/components/CollapseChangesList/CollapseChangesList'
import PendingBuildTypeChangesList from './PendingBuildTypeChangesList/PendingBuildTypeChangesList'

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
			title={'Pending Changes'}
			locator={locator}
			showChangesCount={false}
		>
			<PendingBuildTypeChangesList
				buildTypeId={buildTypeId}
				branch={branch}
			/>
		</CollapseChangesList>
	)
}

export default BuildTypePendingChanges
