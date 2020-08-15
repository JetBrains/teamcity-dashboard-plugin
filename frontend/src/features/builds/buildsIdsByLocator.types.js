// @flow strict
import type { AsyncState } from '../../commontypes'
import type { BuildsLocator } from './builds.locator'
import type { BuildId } from './builds.slice'

export type BuildsIdsByLocator = {|
	...AsyncState,
	id: string,
	locator: BuildsLocator,
	ids: BuildId[],
|}
export type BuildsIdsByLocatorHash = {|
	[locator: string]: BuildsIdsByLocator,
|}
export type BuildsIdsByLocatorState = {|
	ids: string[], // locators
	entities: BuildsIdsByLocatorHash,
|}

export type FetchBuildsByLocatorArgument = {
	locator: BuildsLocator,
	force?: boolean,
	...
}
