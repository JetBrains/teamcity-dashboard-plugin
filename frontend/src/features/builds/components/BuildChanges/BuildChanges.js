// @flow strict
import React, { useMemo } from 'react'
import BuildChangesList from '../../../changes/components/BuildChangesList/BuildChangesList'
import CollapseChangesList from '../../../../widgets/BuildTypeChangesWidget/components/CollapseChangesList/CollapseChangesList'
import type { BuildId } from '../../builds.types'
import BuildStatusLink from '../BuildStatusLink/BuildStatusLink'
import { useIsBreakpointActive } from '../../../widgets/widgetsBreakpoints.hooks'
import { useBuildChangesLocator, useChangesActualCountByLocator } from '../../../changes/changes.hooks'
import TC from '@teamcity/react-api'
import limitCount from '../../../../utils/limitCount'

const { BuildNumber } = TC.Components

interface Properties {
	buildId: BuildId;
}

const BuildChanges = React.memo<Properties>(({ buildId }: Properties) => {
	const locator = useBuildChangesLocator(buildId)
	const count = useChangesActualCountByLocator(locator)

	const isLarge = useIsBreakpointActive('large')

	const buildNumber = useMemo(
		() => <BuildNumber buildId={buildId} hideStar withLink={false} />,
		[buildId]
	)

	const buildStatusLink = useMemo(
		() => <BuildStatusLink buildId={buildId} multiline={!isLarge} />,
		[buildId, isLarge]
	)

	const content = useMemo(() => <BuildChangesList buildId={buildId} />, [
		buildId,
	])

	return (
		<CollapseChangesList
			title={buildNumber}
			count={limitCount(count)}
			extraNode={buildStatusLink}
			compactChangesCount
			compact={isLarge}
			disabled={count === 0}
		>
			{content}
		</CollapseChangesList>
	)
})

BuildChanges.displayName = 'BuildChanges'

export default BuildChanges
