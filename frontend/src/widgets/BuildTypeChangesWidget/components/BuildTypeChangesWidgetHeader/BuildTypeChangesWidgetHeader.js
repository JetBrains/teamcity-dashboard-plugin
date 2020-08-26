// @flow strict
import React from 'react'
import { useBuildTypeIdOption } from '../../options/hooks'
import BuildTypeLink from '../../../../features/buildTypes/components/BuildTypeLink/BuildTypeLink'
import { useBuildTypeConstants } from '../../../../features/buildTypes/buildTypesConstants.hooks'
import ProjectLink from '../../../../features/projects/components/ProjectLink/ProjectLink'

import styles from './BuildTypeChangesWidgetHeader.css'
import SimpleTextWidgetHeader from '../../../../features/widgets/components/SimpleTextWidgetHeader/SimpleTextWidgetHeader'

const BuildTypeChangesWidgetHeader = () => {
	const [buildTypeId] = useBuildTypeIdOption()
	const buildType = useBuildTypeConstants(buildTypeId)

	return buildTypeId !== null && buildTypeId !== undefined ? (
		<div className={styles.BuildTypeChangesWidgetHeader}>
			{buildType && (
				<ProjectLink
					projectId={buildType.projectId}
					className={styles.projectLink}
				/>
			)}
			<BuildTypeLink
				buildTypeId={buildTypeId}
				className={styles.buildTypeLink}
			/>
		</div>
	) : (
		<SimpleTextWidgetHeader>
			Build Configuration Changes
		</SimpleTextWidgetHeader>
	)
}

export default BuildTypeChangesWidgetHeader
