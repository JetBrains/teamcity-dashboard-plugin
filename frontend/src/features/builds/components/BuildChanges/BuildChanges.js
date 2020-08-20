// @flow strict
import React, { useMemo } from 'react'
import BuildChangesList from '../../../changes/components/BuildChangesList/BuildChangesList'

import TC from '@teamcity/react-api'
import type { ChangesLocator } from '../../../changes/changes.locator'
import CollapseChangesList from '../../../../widgets/BuildTypeChangesWidget/components/CollapseChangesList/CollapseChangesList'
import type { BuildId } from '../../builds.types'

import LongTextShortText from '../../../../components/LongTextShortText/LongTextShortText'

const { BuildStatusLink } = TC.Components

interface Properties {
	buildId: BuildId;
}

const BuildChanges = React.memo<Properties>(({ buildId }: Properties) => {
	const locator: ChangesLocator = {
		buildId,
	}

	const title = useMemo(
		() => (
			<LongTextShortText
				shortText={`#${buildId}`}
				longText={`Build #${buildId}`}
			/>
		),
		[buildId]
	)

	return (
		<CollapseChangesList
			title={title}
			locator={locator}
			extraNode={<BuildStatusLink buildId={buildId} />}
		>
			<BuildChangesList buildId={buildId} />
		</CollapseChangesList>
	)
})

BuildChanges.displayName = 'BuildChanges'

export default BuildChanges
