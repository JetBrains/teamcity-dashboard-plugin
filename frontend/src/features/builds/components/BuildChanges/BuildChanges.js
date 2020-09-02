// @flow strict
import React from 'react'
import BuildChangesList from '../../../changes/components/BuildChangesList/BuildChangesList'
import type { ChangesLocator } from '../../../changes/changes.locator'
import CollapseChangesList from '../../../../widgets/BuildTypeChangesWidget/components/CollapseChangesList/CollapseChangesList'
import type { BuildId } from '../../builds.types'
import BuildStatusLink from '../BuildStatusLink/BuildStatusLink'
import { useIsBreakpointActive } from '../../../widgets/widgetsBreakpoints.hooks'

interface Properties {
	buildId: BuildId;
}

const BuildChanges = React.memo<Properties>(({ buildId }: Properties) => {
	const locator: ChangesLocator = {
		buildId,
	}

	const isLarge = useIsBreakpointActive('large')

	return (
		<CollapseChangesList
			title={(`#${buildId}`: React$Node)}
			locator={locator}
			extraNode={<BuildStatusLink buildId={buildId} multiline={!isLarge} />}
			compactChangesCount
			compact={isLarge}
		>
			<BuildChangesList buildId={buildId} />
		</CollapseChangesList>
	)
})

BuildChanges.displayName = 'BuildChanges'

export default BuildChanges
