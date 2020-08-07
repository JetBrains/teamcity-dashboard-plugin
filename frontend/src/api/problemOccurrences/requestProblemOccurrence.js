// @flow strict
import TC from '@teamcity/react-api'
import type { Build } from '../build/schemata'
import { buildFields } from '../build/schemata'

export type ProblemOccurrence = {
	id: string,
	details: string,
	build: Build,
	...
}

const requestProblemOccurrence = (
	problemId: string | number
): Promise<ProblemOccurrence> => {
	return TC.requestJSON(
		`app/rest/problemOccurrences/problem:(id:${problemId})?fields=id,details,build(${buildFields})`
	)
}

export default requestProblemOccurrence
