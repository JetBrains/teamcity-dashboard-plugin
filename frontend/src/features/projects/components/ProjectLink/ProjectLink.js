// @flow strict
import React from 'react'
import classNames from 'classnames'
import type { ProjectId } from '../../projects.types'
import { useProject } from '../../projects.hooks'

import styles from './ProjectLink.css'

interface Properties {
	projectId: ProjectId;
	className?: ?string;
}

const ProjectLink = React.memo<Properties>(
	({ projectId, className }: Properties) => {
		const project = useProject(projectId)
		return (
			<span className={classNames(styles.ProjectLink, className)}>
				/ {project ? project.name : '...'}
			</span>
		)
	}
)

ProjectLink.displayName = 'ProjectLink'

export default ProjectLink
