// @flow strict
import React from 'react'
import type { BuildTypeId } from '../../../../../features/buildTypes/buildTypes.types'
import { useBuildTypeConstants } from '../../../../../features/buildTypes/buildTypesConstants.hooks'

import BuildTypeLink from '../../../../../features/buildTypes/components/BuildTypeLink/BuildTypeLink'
import styles from './BuildTypeLinkWithPath.css'
import ProjectPath from '../../../../../components/ProjectPath/ProjectPath'

interface Properties {
	buildTypeId: BuildTypeId;
}

const BuildTypeLinkWithPath = ({ buildTypeId }: Properties) => {
	const buildType = useBuildTypeConstants(buildTypeId)
	return (
		<div className={styles.BuildTypeLinkWithPath}>
			{buildType && (
				<ProjectPath
					projectId={buildType.projectId}
					className={styles.projectPath}
				/>
			)}
			<BuildTypeLink
				buildTypeId={buildTypeId}
				className={styles.buildTypeLink}
				multiline
			/>
		</div>
	)
}

export default BuildTypeLinkWithPath
