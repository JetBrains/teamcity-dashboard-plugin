// @flow strict
import React, { useMemo } from 'react'
import BuildChangesList from '../../../changes/components/BuildChangesList/BuildChangesList'
import CollapseChangesList from '../../../../widgets/BuildTypeChangesWidget/components/CollapseChangesList/CollapseChangesList'
import type { BuildId } from '../../builds.types'
import BuildStatusLink from '../BuildStatusLink/BuildStatusLink'
import { useIsBreakpointActive } from '../../../widgets/widgetsBreakpoints.hooks'
import { useBuildChangesLocator } from '../../../changes/changes.hooks'

interface Properties {
	buildId: BuildId;
}

const BuildChanges = React.memo<Properties>(({ buildId }: Properties) => {
	const locator = useBuildChangesLocator(buildId)

	const isLarge = useIsBreakpointActive('large')

	const buildStatusLink = useMemo(
		() => <BuildStatusLink buildId={buildId} multiline={!isLarge} />,
		[buildId, isLarge]
	)

	const content = useMemo(() => <BuildChangesList buildId={buildId} />, [
		buildId,
	])

	return (
		<CollapseChangesList
			title={`#${buildId}`}
			locator={locator}
			extraNode={buildStatusLink}
			compactChangesCount
			compact={isLarge}
		>
			{content}
		</CollapseChangesList>
	)
})

BuildChanges.displayName = 'BuildChanges'

export default BuildChanges
