// @flow strict

import type { WidgetType } from './widgets.types'
import type { Component } from './config/widgetComponents.types'

export type WidgetConfig = {
	name: string,
	Header: Component,
	settings: Component,
	Body: Component,
	headerOptions?: Component[],
	openSettingsFirst?: boolean,
	...WidgetConfigDimensions,
	...
}

export type WidgetConfigDimensions = {
	defaultWidth?: number,
	defaultHeight?: number,
	minWidth?: number,
	minHeight?: number,
	...
}

export type WidgetConfigs = {|
	[type: WidgetType]: WidgetConfig,
|}
