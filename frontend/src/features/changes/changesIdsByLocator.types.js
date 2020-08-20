// @flow strict

import type { AsyncState } from '../../commontypes'
import type { ChangesLocator } from './changes.locator'
import type { Change, ChangeId } from './changes.slice'

export type ChangesIdsByLocatorEntity = {|
	...AsyncState,
	id: string,
	locator: ChangesLocator,
	actualCount: number,
	changesIds: ChangeId[],
|}
export type ChangesIdsByLocatorHash = {|
	[locator: string]: ChangesIdsByLocatorEntity,
|}
export type ChangesIdsByLocatorState = {|
	ids: string[],
	entities: ChangesIdsByLocatorHash,
|}

export type FetchChangesByLocatorArgument = {
	locator: ChangesLocator,
	force?: boolean,
	...
}

export type FetchChangesByLocatorResult = {
	changes: Change[],
	actualCount: number,
	...
}
