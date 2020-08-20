// @flow strict
import React from 'react'
import { useSubscribeOnBuildTypeStatus } from '../../../buildTypes.hooks'

import TC from '@teamcity/react-api'
import type { BuildTypeId } from '../../../buildTypes.types'

const { OverviewStatusIcon } = TC.Components

interface Properties {
	buildTypeId: BuildTypeId;
}

const BuildTypeStatusIcon = React.memo<Properties>(
	({ buildTypeId }: Properties) => {
		useSubscribeOnBuildTypeStatus(buildTypeId)

		return <OverviewStatusIcon type="buildType" id={buildTypeId} />
	}
)

BuildTypeStatusIcon.displayName = 'BuildTypeStatus'

export default BuildTypeStatusIcon
