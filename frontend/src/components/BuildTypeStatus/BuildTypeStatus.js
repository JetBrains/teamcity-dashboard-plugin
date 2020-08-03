// @flow strict
import React from 'react'
import type { BuildTypeId } from '../../store/slices/buildTypesSlice'
import TC from '@teamcity/react-api'
import useBuildType from '../../hooks/buildTypes/useBuildType'

const {OverviewStatusIcon} = TC.Components

interface Properties {
	buildTypeId: BuildTypeId;
}

const BuildTypeStatus = React.memo<Properties>(({ buildTypeId }: Properties) => {
	const buildType = useBuildType(buildTypeId)
	TC.hooks.useSubscribeOnBuildTypeStatus(buildTypeId, buildType?.internalId)

	if (buildType === undefined || buildType === null) {
		return <span>Loading</span>
	} else {
		return (
			<div>
				{/*<ProjectOrBuildTypeIcon*/}
				{/*	type="buildType"*/}
				{/*	status={status === 'SUCCESS' ? 'successful' : 'failed'}*/}
				{/*/>*/}
				<OverviewStatusIcon type="buildType" id={buildType.id} />
				<span>{buildType.name}</span>
			</div>
		)
	}
})

BuildTypeStatus.displayName = 'BuildTypeStatus'

export default BuildTypeStatus
