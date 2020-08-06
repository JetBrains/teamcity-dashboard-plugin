// @flow strict
import TC from '@teamcity/react-api'
import type { BuildId } from '../../store/slices/investigationsSlice'

export type ProblemOccurrence = {
	id: string,
	details: string,
	build: {
		id: BuildId,
		webUrl: string,
		...
	},
	...
}

const requestProblemOccurrence = (
	problemId: string | number
): Promise<ProblemOccurrence> => {
	return TC.requestJSON(
		`app/rest/problemOccurrences/problem:(id:${problemId})?fields=id,details,build(id,webUrl)`
	)
}

export default requestProblemOccurrence
