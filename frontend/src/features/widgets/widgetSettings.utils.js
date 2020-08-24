// @flow strict

import type { WidgetData, WidgetId } from './widgets.types'
import deepCopyJson from '../../utils/deepCopySerializable'
import { HIDDEN_SETTINGS_WIDGET_ID } from './widgetSettings.slice'

export const copyWidget = (widget: WidgetData, newId: WidgetId): WidgetData => {
	const copy = deepCopyJson(widget)
	copy.id = newId
	return copy
}

export const makeHiddenSettingsWidget = (widget: WidgetData): WidgetData =>
	copyWidget(widget, HIDDEN_SETTINGS_WIDGET_ID)
