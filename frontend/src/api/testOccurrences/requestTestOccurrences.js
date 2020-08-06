// @flow strict
import TC from '@teamcity/react-api'
import { buildFields } from '../build/schemata'
import type { Build } from '../build/schemata'

export type TestOccurrence = {
	build: Build,
	...
}

type TestOccurrences = {
	testOccurrence: TestOccurrence[],
	...
}

const requestTestOccurrences = async (
	testId: number | string
): Promise<TestOccurrence[]> => {
	const testOccurrences: TestOccurrences = await TC.requestJSON(
		`app/rest/testOccurrences?locator=test:(id:${testId})&fields=testOccurrence(build(${buildFields}))`
	)
	return testOccurrences.testOccurrence
}

export default requestTestOccurrences
