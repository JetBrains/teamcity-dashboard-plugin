// @flow strict
import React from 'react'
import classNames from 'classnames'
import type { ProjectId } from '../../projects.types'
import { useProject } from '../../projects.hooks'

import styles from './ProjectLink.css'
// $FlowFixMe
import { Link } from '@jetbrains/ring-ui'
import { getProjectLinkHref } from '../../project.utils'

interface Properties {
	projectId: ProjectId;
	className?: ?string;
}

const ProjectLink = React.memo<Properties>(
	({ projectId, className }: Properties) => {
		const project = useProject(projectId)
		const href = getProjectLinkHref(projectId)
		return (
			<span className={classNames(styles.ProjectLink, className)}>
				/{' '}
				<Link className={styles.link} href={href}>
					{project ? project.name : '...'}
				</Link>
			</span>
		)
	}
)

ProjectLink.displayName = 'ProjectLink'

export default ProjectLink
