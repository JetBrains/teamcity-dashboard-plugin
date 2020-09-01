// @flow strict

import type {
	BreakpointName,
	WidgetBreakpoints,
	WidgetDimensionsProperties,
	WidgetProperties,
} from './widgetProperties.types'
import widgetsProperties from './widgetProperties'
import type { WidgetType } from '../widgets.types'
import isEmpty from 'just-is-empty'

const emptyObject = {}

type Selector<T> = (type: WidgetType) => T

export const supportedWidgetTypes: WidgetType[] = Object.keys(widgetsProperties)

export const isWidgetTypeSupported = (string: string): boolean =>
	supportedWidgetTypes.includes(string)

const getWidgetProperties: Selector<?WidgetProperties> = (type) =>
	widgetsProperties[type]

export const getWidgetName: Selector<string> = (type) =>
	getWidgetProperties(type)?.name ?? '?'

export const widgetHasSettings: Selector<boolean> = (type) =>
	isWidgetTypeSupported(type)
		? getWidgetProperties(type)?.hasSettings ?? true
		: false

export const isWidgetCloneable: Selector<boolean> = isWidgetTypeSupported

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

const getWidgetBreakpoints: Selector<WidgetBreakpoints> = (type) =>
	getWidgetProperties(type)?.breakpoints ?? emptyObject

export const shouldWidgetBeMeasured: Selector<boolean> = (type) =>
	isWidgetTypeSupported(type) && !isEmpty(getWidgetBreakpoints(type))

export const getWidgetCurrentBreakpoint = (
	type: WidgetType,
	width: number
): ?BreakpointName => {
	const breakpoints = getWidgetBreakpoints(type)
	const breakpointsNames = Object.keys(breakpoints)

	if (breakpointsNames.length === 0) {
		return
	}

	for (let i = 0; i < breakpointsNames.length; i++) {
		const currentBreakpointName = breakpointsNames[i]
		const currentBreakpointValue = breakpoints[currentBreakpointName]
		if (currentBreakpointValue > width) {
			return i !== 0 ? breakpointsNames[i - 1] : undefined
		}
	}
	return breakpointsNames[breakpointsNames.length - 1]
}

export const getWidgetBreakpointsNotGreaterThan = (
	type: WidgetType,
	breakpoint: BreakpointName
): BreakpointName[] => {
	const breakpoints = getWidgetBreakpoints(type)
	const breakpointsNames = Object.keys(breakpoints)

	const indexOfCurrent = breakpointsNames.indexOf(breakpoint)

	if (indexOfCurrent === -1) {
		return []
	} else {
		return breakpointsNames.slice(0, indexOfCurrent + 1)
	}
}
