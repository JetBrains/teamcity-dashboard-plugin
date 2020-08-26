// @flow strict

import type { WidgetType } from './widgets.types'

export type Component = () => React$Node

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
	[type: WidgetType]: WidgetConfig
|}
