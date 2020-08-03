// @flow strict
import React from 'react'
import TC from '@teamcity/react-api'
import type { ProjectId } from '../../store/slices/projectsSlice'
import useProjectPath from '../../hooks/projects/useProjectPath'
import { useSelector } from 'react-redux'
import { selectProjectsStatus } from '../../store/slices/projectsSlice'

const { BuildPath } = TC.Components

interface Properties {
	projectId: ProjectId;
}

const ProjectPath = React.memo<Properties>(({ projectId }: Properties) => {
	const path = useProjectPath(projectId)
	const projectFetchingStatus = useSelector(selectProjectsStatus)
	console.log('project path', path)
	if (projectFetchingStatus !== 'succeeded') {
		return <span>Loading</span>
	} else {
		return <BuildPath path={path} withIcons />
		// return (
		// 	<BuildPathContainer
		// 		projectOrBuildTypeNode={{ nodeType: 'project', id: projectId }}
		// 	/>
		// )
	}
})

ProjectPath.displayName = 'ProjectPath'

export default ProjectPath
