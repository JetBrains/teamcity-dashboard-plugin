// @flow strict
import type { User } from '../../api/user/schemata'
import type { AsyncState } from '../../commontypes'

export type ChangeId = number

export type Change = {
	id: ChangeId,
	username: string,
	comment: string,
	date: string,
	webUrl?: ?string,
	user?: User,
	filesCount: number,
	...
}

export type ChangesHash = {|
	[id: ChangeId]: Change,
|}

export type ChangesState = {|
	id: ChangeId[],
	entities: ChangesHash,
|}

export type ChangesByLocator = {|
	...AsyncState,
	changesIds: ChangeId[],
	changes: Change[],
|}
