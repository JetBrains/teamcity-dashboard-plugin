// @flow strict
import type { Change, ChangeId } from './changes.slice'
import TC from '@teamcity/react-api'
import type { ChangesLocator } from './changes.locator'
import { stringifyChangesLocator } from './changes.locator'
import { parseTimestamp } from '../../utils/parseTimestamp'

type FetchedChange = {
	id: ChangeId,
	username: string,
	comment: string,
	date: string,
	webUrl?: ?string,
	...
}

type FetchedChanges = {
	change: FetchedChange[],
	...
}

const changeFields = 'id,username,comment,date,webUrl'

export const parseChange = ({
	id,
	username,
	comment,
	date,
	webUrl,
}: FetchedChange): Change => ({
	id,
	username,
	comment,
	webUrl,
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
	return fetchedChanges.change.map((fetchedChange) =>
		parseChange(fetchedChange)
	)
}

export const requestChangesCount = async (
	locator: ChangesLocator
): Promise<number> => {
	const fetchedCountable = await TC.requestJSON(
		`app/rest/changes?locator=${stringifyChangesLocator(
			locator,
			false
		)}&fields=count`
	)
	return fetchedCountable.count
}
