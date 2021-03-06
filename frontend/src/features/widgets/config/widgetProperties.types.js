// @flow strict

import type { WidgetType } from '../widgets.types'

export type WidgetDimensionsProperties = {|
	defaultWidth: number,
	defaultHeight: number,
	minWidth: number,
	minHeight: number,
|}

export type BreakpointName = 'small' | 'medium' | 'large'

export type WidgetBreakpoints = {|
	[breakpointName: BreakpointName]: number,
|}

export type WidgetProperties = {|
	name: string,
	openSettingsFirst?: boolean,
	hasSettings?: boolean,
	defaultWidth?: number,
	defaultHeight?: number,
	minWidth?: number,
	minHeight?: number,
	breakpoints?: WidgetBreakpoints,
|}

export type AllWidgetsProperties = {|
	[type: WidgetType]: WidgetProperties,
|}
