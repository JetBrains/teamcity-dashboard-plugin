// @flow strict
import React from 'react'
import type { BuildTypeId } from '../../../../../features/buildTypes/buildTypes.types'
import { useBuildTypeConstants } from '../../../../../features/buildTypes/buildTypesConstants.hooks'

import TC from '@teamcity/react-api'
import BuildTypeLink from '../../../../../features/buildTypes/components/BuildTypeLink/BuildTypeLink'

const {ProjectPath} = TC.Components

interface Properties {
	buildTypeId: BuildTypeId
}

const BuildTypeLinkWithPath = ({ buildTypeId }: Properties) => {
	const buildType = useBuildTypeConstants(buildTypeId)
	return (
		<div>
			{buildType && <ProjectPath projectId={buildType.projectId}/>}
			<BuildTypeLink buildTypeId={buildTypeId} />
		</div>
	)
}

export default BuildTypeLinkWithPath
