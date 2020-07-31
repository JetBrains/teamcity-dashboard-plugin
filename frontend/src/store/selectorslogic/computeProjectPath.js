// @flow strict
import type { Project, ProjectsHash } from '../slices/projectsSlice'

const computeProjectPath = (
	projectsHash: ProjectsHash,
	project: Project
): Project[] => {
	if (project === null || project === undefined) {
		return []
	}
	const path: Project[] = []
	let currentProject = project
	while (
		currentProject.parentProjectId !== undefined &&
		currentProject.parentProjectId !== null
	) {
		path.unshift(currentProject)
		if (
			currentProject.parentProjectId === undefined ||
			currentProject.parentProjectId === null ||
			projectsHash[currentProject.parentProjectId] === undefined ||
			projectsHash[currentProject.parentProjectId] === null
		) {
			throw new Error(
				`Could not find parent of project with id=${currentProject.id}`
			)
		}
		currentProject = projectsHash[currentProject.parentProjectId]
	}
	return path
}

export default computeProjectPath
