// @flow strict

import type {
	AbstractWidgetData,
	WidgetDataData,
	WidgetId,
	WidgetType,
} from './widgets.types'
import deepCopyJson from '../../utils/deepCopyJson'
import { HIDDEN_SETTINGS_WIDGET_ID } from './widgetSettings.slice'

export const copyWidget = <Type: WidgetType, Data: WidgetDataData>(
	widget: AbstractWidgetData<Type, Data>,
	newId: WidgetId
): AbstractWidgetData<Type, Data> => {
	const copy = deepCopyJson(widget)
	copy.id = newId
	return copy
}

export const makeHiddenSettingsWidget = <
	Type: WidgetType,
	Data: WidgetDataData
>(
	widget: AbstractWidgetData<Type, Data>
): AbstractWidgetData<Type, Data> =>
	copyWidget(widget, HIDDEN_SETTINGS_WIDGET_ID)
