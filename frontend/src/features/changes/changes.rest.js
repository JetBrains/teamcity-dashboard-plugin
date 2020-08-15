// @flow strict
import type { Change, ChangeId } from './changes.slice'
import TC from '@teamcity/react-api'
import type { BuildTypeId } from '../../hooks/TC/schemata'
import type { ChangesLocator } from './changes.locator'
import { stringifyChangesLocator } from './changes.locator'
import type { BuildId } from '../builds/builds.slice'
import { parseTimestamp } from '../../utils/parseTimestamp'

type FetchedChange = {
	id: ChangeId,
	username: string,
	comment: string,
	date: string,
	...
}

type FetchedChanges = {
	change: FetchedChange[],
	...
}

const changeFields = 'id,username,comment,date'

export const parseChange = ({
	id,
	username,
	comment,
	date,
}: FetchedChange): Change => ({
	id,
	username,
	comment,
	date: parseTimestamp(date).toUTCString(),
})

export const requestChanges = async (
	locator: ChangesLocator
): Promise<Change[]> => {
	const fetchedChanges: FetchedChanges = await TC.requestJSON(
		`app/rest/changes?locator=${stringifyChangesLocator(
			locator
		)}&fields=change(${changeFields})`
	)
	return fetchedChanges.change.map(fetchedChange => parseChange(fetchedChange))
}

// export const requestBuildChanges = (buildId: BuildId): Promise<Change[]> =>
// 	requestChanges(`build:(id:${buildId})`)
//
// export const requestPendingBuildTypeChanges = (
// 	buildTypeId: BuildTypeId
// ): Promise<Change[]> =>
// 	requestChanges(`buildType:(id:${buildTypeId}),pending:true`)
