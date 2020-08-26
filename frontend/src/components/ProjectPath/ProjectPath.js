// @flow strict
import React from 'react'
import TC from '@teamcity/react-api'
import styles from './ProjectPath.css'
import type { ProjectId } from '../../features/projects/projects.types'

const { BuildPath } = TC.Components

interface Properties {
	projectId: ProjectId;
}

const ProjectPath = React.memo<Properties>(({ projectId }: Properties) => {
	return <BuildPath projectId={projectId} className={styles.ProjectPath} />
})

ProjectPath.displayName = 'ProjectPath'

export default ProjectPath
