// @flow strict

import type { WidgetId, WidgetType } from './widgets.types'

export type WidgetSettingsState = {|
	areSettingsOpened: boolean,
	widgetId: ?WidgetId,
	widgetType: ?WidgetType,
	isWidgetNew: boolean,
|}

export type OpenWidgetSettingsPayload =
	| {| id: WidgetId, type: WidgetType, isNew: false |}
	| {| type: WidgetType, isNew: true |}

export type SaveWidgetSettingsActionCreatorArgument =
	| {|
			id: WidgetId,
			type: WidgetType,
			isNew: false,
	  |}
	| {| id: void, type: WidgetType, isNew: true |}

export type SaveWidgetSettingsActionPayload = {|
	id: WidgetId,
	type: WidgetType,
	isNew: boolean,
|}

export type StartAddingNewWidgetPayload = {|
	type: WidgetType,
	openSettings: boolean,
|}

export type StartAddingNewWidgetPrepareFunction = (SaveWidgetSettingsActionCreatorArgument) => {|
	payload: StartAddingNewWidgetPayload,
|}
