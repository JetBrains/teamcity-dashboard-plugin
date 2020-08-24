// @flow strict

import type { WidgetId } from './widgets.types'

export type WidgetSettingsState = {|
	areSettingsOpened: boolean,
	widgetId: ?WidgetId,
	isWidgetNew: boolean,
|}

export type SaveWidgetSettingsActionPayload = {|
	id: ?WidgetId,
	isNew: boolean,
|}
