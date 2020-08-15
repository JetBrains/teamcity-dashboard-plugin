// @flow strict

import type { AsyncState } from '../../commontypes'
import type { ChangesLocator } from './changes.locator'
import type { ChangeId } from './changes.slice'

export type ChangesIdsByLocator = {|
	...AsyncState,
	id: string,
	locator: ChangesLocator,
	changesIds: ChangeId[],
|}
export type ChangesIdsByLocatorHash = {|
	[locator: string]: ChangesIdsByLocator,
|}
export type ChangesIdsByLocatorState = {|
	ids: string[],
	entities: ChangesIdsByLocatorHash,
|}

export type FetchChangesByLocatorArg = {
	locator: ChangesLocator,
	force?: boolean,
	...
}
