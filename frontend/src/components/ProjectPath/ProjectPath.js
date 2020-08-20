// @flow strict
import React from 'react'
import TC from '@teamcity/react-api'
import usePathToProjectOrBuildType from '../../hooks/TC/usePathToProjectOrBuildType'
import styles from './ProjectPath.css'
import type { ProjectId } from '../../features/projects/projects.types'

const { BuildPath } = TC.Components

interface Properties {
	projectId: ProjectId;
}

const ProjectPath = React.memo<Properties>(({ projectId }: Properties) => {
	const fullPath = usePathToProjectOrBuildType('project', projectId)
	return <BuildPath path={fullPath} className={styles.ProjectPath} withIcons />
})

ProjectPath.displayName = 'ProjectPath'

export default ProjectPath
