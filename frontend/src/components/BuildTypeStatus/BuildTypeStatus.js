// @flow strict
import React from 'react'
import TC from '@teamcity/react-api'
import type { BuildTypeId } from '../../hooks/TC/schemata'
import useSubscribeOnBuildTypeStatus from '../../hooks/TC/useSubscribeOnBuildTypeStatus'

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
