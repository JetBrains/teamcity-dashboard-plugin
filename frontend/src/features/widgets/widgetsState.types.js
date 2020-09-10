// @flow strict

import type { WidgetId } from './widgets.types'

export type InvestigationsWidgetState = {||}

export type BuildTypeChangesWidgetState = {|
	areAllExpanded?: boolean,
|}

export type WidgetState =
	| InvestigationsWidgetState
	| BuildTypeChangesWidgetState

export type WidgetStateEntity = {|
	id: WidgetId,
	state: WidgetState,
|}

export type WidgetStateHash = {|
	[id: WidgetId]: WidgetStateEntity,
|}

export type WidgetStateState = {|
	ids: WidgetId[],
	entities: WidgetStateHash,
|}

export type SetWidgetPropertyActionPayload<T> = {|
	id: WidgetId,
	propertyName: string,
	propertyValue: T
|}

