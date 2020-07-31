// @flow strict
import React from 'react'
import type { BuildTypeId } from '../../store/slices/buildTypesSlice'
import TC from '@teamcity/react-api'
import useBuildType from '../../hooks/buildTypes/useBuildType'

const { ProjectOrBuildTypeIcon } = TC.Components

interface Properties {
	buildTypeId: BuildTypeId;
}

const BuildTypeStatus = ({ buildTypeId }: Properties) => {
	const buildType = useBuildType(buildTypeId)

	if (buildType === undefined || buildType === null) {
		return <span>Loading</span>
	} else {
		return (
			<div>
				<ProjectOrBuildTypeIcon type="buildType" />
				<span>{buildType.name}</span>
			</div>
		)
	}
}

export default BuildTypeStatus
