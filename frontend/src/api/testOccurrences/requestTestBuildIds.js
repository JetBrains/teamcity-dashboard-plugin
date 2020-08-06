// @flow strict
import type { BuildId } from '../../store/slices/investigationsSlice'
import requestTestOccurrences from './requestTestOccurrences'

const requestTestBuildIds = async (testId: number | string): Promise<BuildId[]> => {
	const testOccurrences = await requestTestOccurrences(testId)
	return testOccurrences.map(testOccurrence => testOccurrence.build.id)
}

export default requestTestBuildIds
