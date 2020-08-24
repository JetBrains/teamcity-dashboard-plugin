// @flow strict
import React from 'react'
import type { BranchesLocator } from '../../../branches/branches.locator'
import CollapseChangesList from '../../../../widgets/BuildTypeChangesWidget/components/CollapseChangesList/CollapseChangesList'
import PendingBuildTypeChangesList from './PendingBuildTypeChangesList/PendingBuildTypeChangesList'
import type { BuildTypeId } from '../../../buildTypes/buildTypes.types'
import { usePendingBuildTypeChangesLocator } from '../../changes.hooks'

interface Properties {
	buildTypeId: BuildTypeId;
	branch: BranchesLocator;
}

const BuildTypePendingChanges = ({ buildTypeId, branch }: Properties) => {
	const locator = usePendingBuildTypeChangesLocator(buildTypeId, branch)

	return (
		<CollapseChangesList title={('Pending': React$Node)} locator={locator}>
			<PendingBuildTypeChangesList
				buildTypeId={buildTypeId}
				branch={branch}
			/>
		</CollapseChangesList>
	)
}

export default BuildTypePendingChanges
