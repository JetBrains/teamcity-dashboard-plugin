// @flow strict
import type { Project } from '../../store/slices/projectsSlice'
import TC from '@teamcity/react-api'

type FetchedProjects = {
	count: number,
	href: string,
	project: Project[],
	...
}

const requestProjects = async (): Promise<Project[]> => {
	const json: FetchedProjects = await TC.requestJSON(
		'app/rest/projects?fields=project(id,parentProjectId,name,description,href,webUrl)'
	)
	return json.project
}

export default requestProjects
