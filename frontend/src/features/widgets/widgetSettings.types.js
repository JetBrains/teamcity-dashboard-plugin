// @flow strict

import type { WidgetId, WidgetType } from './widgets.types'

export type WidgetSettingsState = {|
	areSettingsOpened: boolean,
	widgetId: ?WidgetId,
	isWidgetNew: boolean,
|}

export type SaveWidgetSettingsActionPayload = {|
	id: ?WidgetId,
	isNew: boolean,
|}

export type StartAddingNewWidgetPayload = {|
	type: WidgetType,
	openSettings: boolean,
|}
