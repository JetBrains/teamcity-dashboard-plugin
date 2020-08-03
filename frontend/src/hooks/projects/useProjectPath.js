// @flow strict
import { useMemo } from 'react'
import type { Project, ProjectId } from '../../store/slices/projectsSlice'
import { useSelector } from 'react-redux'
import { selectProjectPath } from '../../store/slices/projectsSlice'

const useProjectPath = (projectId: ProjectId): Project[] => {
	console.log('selectProjectPath', selectProjectPath)
	console.log('createdSelector', selectProjectPath(projectId))
	if (projectId === undefined || projectId === null) {
		console.error('useProjectPath called with undefined projectId')
	}
	const selectProjectPathForThisProject = useMemo(
		() => selectProjectPath(projectId),
		[projectId]
	)
	return useSelector(selectProjectPathForThisProject)
}

export default useProjectPath
