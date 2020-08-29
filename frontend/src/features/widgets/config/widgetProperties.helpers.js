// @flow strict

import type {
	WidgetDimensionsProperties,
	WidgetProperties,
} from './widgetProperties.types'
import widgetsProperties from './widgetProperties'
import type { WidgetType } from '../widgets.types'

type Selector<T> = (type: WidgetType) => T

export const supportedWidgetTypes: WidgetType[] = Object.keys(widgetsProperties)

export const isWidgetTypeSupported = (string: string): boolean =>
	supportedWidgetTypes.includes(string)

const getWidgetProperties: Selector<?WidgetProperties> = (type) =>
	widgetsProperties[type]

export const getWidgetName: Selector<string> = (type) =>
	getWidgetProperties(type)?.name ?? '?'

export const widgetHasSettings: Selector<boolean> = (type) =>
getWidgetProperties(type)?.hasSettings ?? true

export const shouldWidgetOpenSettingsFirst: Selector<boolean> = (type) =>
	getWidgetProperties(type)?.openSettingsFirst ?? widgetHasSettings(type)

export const getWidgetDimensionsProperties: Selector<WidgetDimensionsProperties> = (
	type
) => {
	const { defaultWidth, defaultHeight, minWidth, minHeight } =
		getWidgetProperties(type) ?? {}
	return {
		defaultWidth: defaultWidth ?? 2,
		defaultHeight: defaultHeight ?? 3,
		minHeight: minHeight ?? 1,
		minWidth: minWidth ?? 1,
	}
}
