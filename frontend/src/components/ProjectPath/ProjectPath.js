// @flow strict
import React from 'react'
import TC from '@teamcity/react-api'
import usePathToProjectOrBuildType from '../../hooks/TC/usePathToProjectOrBuildType'
import type { ProjectId } from '../../hooks/TC/schemata'

const { BuildPath } = TC.Components

interface Properties {
	projectId: ProjectId;
}

const ProjectPath = React.memo<Properties>(({ projectId }: Properties) => {
	const fullPath = usePathToProjectOrBuildType('project', projectId)
	return <BuildPath path={fullPath} withIcons/>
})

ProjectPath.displayName = 'ProjectPath'

export default ProjectPath
