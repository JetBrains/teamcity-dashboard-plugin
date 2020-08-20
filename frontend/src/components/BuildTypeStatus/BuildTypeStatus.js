// @flow strict
import React from 'react'
import TC from '@teamcity/react-api'
import {useSubscribeOnBuildTypeStatus} from '../../features/buildTypes/buildTypes.hooks'
import type { BuildTypeId } from '../../features/buildTypes/buildTypes.types'

const { OverviewStatusIcon } = TC.Components

interface Properties {
	buildTypeId: BuildTypeId;
}

const BuildTypeStatus = React.memo<Properties>(
	({ buildTypeId }: Properties) => {
		useSubscribeOnBuildTypeStatus(buildTypeId)

		return (
			<span>
				<OverviewStatusIcon type="buildType" id={buildTypeId} />
			</span>
		)
	}
)

BuildTypeStatus.displayName = 'BuildTypeStatus'

export default BuildTypeStatus
