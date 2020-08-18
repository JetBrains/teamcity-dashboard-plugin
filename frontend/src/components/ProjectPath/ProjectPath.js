// @flow strict
import React from 'react'
import TC from '@teamcity/react-api'
import usePathToProjectOrBuildType from '../../hooks/TC/usePathToProjectOrBuildType'
import type { ProjectId } from '../../hooks/TC/schemata'
import styles from './ProjectPath.css'

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
