// @flow strict
import React from 'react'
import BuildChangesList from '../../../changes/components/BuildChangesList/BuildChangesList'

import TC from '@teamcity/react-api'
import type { ChangesLocator } from '../../../changes/changes.locator'
import CollapseChangesList from '../../../../widgets/BuildTypeChangesWidget/components/CollapseChangesList/CollapseChangesList'
import type { BuildId } from '../../builds.types'


const { BuildStatusLink } = TC.Components

interface Properties {
	buildId: BuildId;
}

const BuildChanges = React.memo<Properties>(({ buildId }: Properties) => {
	const locator: ChangesLocator = {
		buildId,
	}

	return (
		<CollapseChangesList
			title={(`#${buildId}`: React$Node)}
			locator={locator}
			extraNode={<BuildStatusLink buildId={buildId} />}
			compactChangesCount
		>
			<BuildChangesList buildId={buildId} />
		</CollapseChangesList>
	)
})

BuildChanges.displayName = 'BuildChanges'

export default BuildChanges
