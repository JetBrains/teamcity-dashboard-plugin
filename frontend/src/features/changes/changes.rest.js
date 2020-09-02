// @flow strict
import TC from '@teamcity/react-api'
import type { ChangesLocator } from './changes.locator'
import { stringifyChangesLocator } from './changes.locator'
import { parseTimestamp } from '../../utils/parseTimestamp'
import { userFields } from '../../api/user/schemata'
import type { User } from '../../api/user/schemata'
import type { Change, ChangeId } from './changes.types'

type FetchedChange = {
	id: ChangeId,
	username: string,
	comment: string,
	date: string,
	webUrl?: ?string,
	user?: User,
	files: {
		count: number,
		...
	},
	...
}

type FetchedChanges = {
	change: FetchedChange[],
	...
}

const changeFields = `id,username,comment,date,webUrl,user(${userFields}),files(count)`

export const parseChange = ({
	id,
	username,
	comment,
	date,
	webUrl,
	user,
	files,
}: FetchedChange): Change => ({
	id,
	username,
	comment,
	webUrl,
	user,
	date: parseTimestamp(date).toUTCString(),
	filesCount: files.count
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
