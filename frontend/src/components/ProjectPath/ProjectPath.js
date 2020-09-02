// @flow strict
import React from 'react'
import classnames from 'classnames'
import TC from '@teamcity/react-api'
import styles from './ProjectPath.css'
import type { ProjectId } from '../../features/projects/projects.types'
import ClampedText from '../ClampedText/ClampedText'
import { useThisWidgetId } from '../../features/widgets/widgets.hooks'
import { useFetchProjects } from '../../features/projects/projects.hooks'

const { EntityPath, ProjectPath: TCProjectPath } = TC.Components

type Properties = {|
	projectId: ProjectId,
	className?: ?string,
	multiline?: boolean,
|}

const ProjectPath = React.memo<Properties>(
	({ projectId, className, multiline = false }: Properties) => {
		useFetchProjects()
		const id = useThisWidgetId()
		const classes = classnames(className, styles.ProjectPath)
		return multiline ? (
			<ClampedText maxLines={3}>
				<EntityPath
					projectId={projectId}
					className={classes}
					withLeafStatusIcon={false}
				/>
			</ClampedText>
		) : (
			<TCProjectPath
				projectId={projectId}
				className={classes}
				elementKey={id}
				withCollapsing
			/>
		)
	}
)

ProjectPath.displayName = 'ProjectPath'

export default ProjectPath
