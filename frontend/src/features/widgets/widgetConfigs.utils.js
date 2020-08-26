// @flow strict

import type { WidgetType } from './widgets.types'
import widgetConfigs from './widgetConfigs'
import type {
	Component,
	WidgetConfig,
	WidgetConfigDimensions,
} from './widgetConfigs.types'

const emptyArray = []

type WidgetConfigsUtilsSelector<T> = (WidgetType) => T

type ComponentSelector = WidgetConfigsUtilsSelector<?Component>

export const supportedWidgetTypes: $ReadOnlyArray<WidgetType> = Object.keys(
	widgetConfigs
)

export const isWidgetTypeSupported: WidgetConfigsUtilsSelector<boolean> = (
	type
) => type in widgetConfigs

export const getWidgetConfig: WidgetConfigsUtilsSelector<WidgetConfig> = (
	type
) => widgetConfigs[type]

export const getWidgetName: WidgetConfigsUtilsSelector<string> = (type) =>
	getWidgetConfig(type).name

export const getWidgetHeaderOptions: WidgetConfigsUtilsSelector<Component[]> = (
	type
) => getWidgetConfig(type).headerOptions ?? emptyArray

export const getWidgetHeaderComponent: ComponentSelector = (type) =>
	getWidgetConfig(type).Header

export const getWidgetBodyComponent: ComponentSelector = (type) =>
	getWidgetConfig(type).Body

export const getWidgetSettingsComponent: ComponentSelector = (type) =>
	getWidgetConfig(type).settings

export const shouldWidgetOpenSettingsFirst = (type: WidgetType): boolean =>
	getWidgetConfig(type).openSettingsFirst ?? true

export const getWidgetConfigDimensions: WidgetConfigsUtilsSelector<WidgetConfigDimensions> = (
	type
) => {
	const {
		defaultWidth,
		defaultHeight,
		minWidth,
		minHeight,
	} = getWidgetConfig(type)
	return { defaultWidth, defaultHeight, minWidth, minHeight }
}
