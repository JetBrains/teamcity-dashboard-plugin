// @flow strict
import React from 'react'
import type { BuildId } from '../../../../builds.types'
import { useRunningBuildLeftSeconds } from '../../../../builds.hooks'

import TC from '@teamcity/react-api'
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown'
import Popup from '@jetbrains/ring-ui/components/popup/popup'

const {BuildDurationDetails} = TC.Components

interface Properties {
	buildId: BuildId
}

const RunningBuildTimeProperties = ({ buildId }: Properties) => {
	const secondsLeft = useRunningBuildLeftSeconds(buildId)

	const anchor = (
		<span>{secondsLeft !== null && secondsLeft !== undefined ? `${secondsLeft}s left` : 'Loading...'}</span>
	)

	return (
		<Dropdown
			anchor={anchor}
			hoverShowTimeOut={300}
			hoverHideTimeOut={300}
			clickMode={false}
			hoverMode
		>
			<Popup>
				<BuildDurationDetails buildId={buildId} />
			</Popup>
		</Dropdown>
	)
}

export default RunningBuildTimeProperties
