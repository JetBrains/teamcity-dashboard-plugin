// @flow strict
import React from 'react'
import type { BuildTypeId } from '../../../../../features/buildTypes/buildTypes.types'
import { useBuildTypeConstants } from '../../../../../features/buildTypes/buildTypesConstants.hooks'

import TC from '@teamcity/react-api'
import BuildTypeLink from '../../../../../features/buildTypes/components/BuildTypeLink/BuildTypeLink'
import styles from './BuildTypeLinkWithPath.css'

const {ProjectPath} = TC.Components

interface Properties {
	buildTypeId: BuildTypeId
}

const BuildTypeLinkWithPath = ({ buildTypeId }: Properties) => {
	const buildType = useBuildTypeConstants(buildTypeId)
	return (
		<div className={styles.BuildTypeLinkWithPath}>
			{buildType && <ProjectPath projectId={buildType.projectId} className={styles.projectPath}/>}
			<BuildTypeLink buildTypeId={buildTypeId} />
		</div>
	)
}

export default BuildTypeLinkWithPath
