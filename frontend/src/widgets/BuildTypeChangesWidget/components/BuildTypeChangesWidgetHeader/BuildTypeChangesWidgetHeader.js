// @flow strict
import React from 'react'
import { useBuildTypeIdOption } from '../../options/hooks'
import BuildTypeLink from '../../../../features/buildTypes/components/BuildTypeLink/BuildTypeLink'
import { useBuildTypeConstants } from '../../../../features/buildTypes/buildTypesConstants.hooks'
import ProjectLink from '../../../../features/projects/components/ProjectLink/ProjectLink'

import styles from './BuildTypeChangesWidgetHeader.css'

const BuildTypeChangesWidgetHeader = () => {
	const [buildTypeId] = useBuildTypeIdOption()
	const buildType = useBuildTypeConstants(buildTypeId)

	return (
		<div className={styles.BuildTypeChangesWidgetHeader}>
			{buildType && (
				<ProjectLink
					projectId={buildType.projectId}
					className={styles.projectLink}
				/>
			)}
			{buildTypeId !== null && buildTypeId !== undefined && (
				<BuildTypeLink
					buildTypeId={buildTypeId}
					className={styles.buildTypeLink}
				/>
			)}
		</div>
	)
}

export default BuildTypeChangesWidgetHeader
