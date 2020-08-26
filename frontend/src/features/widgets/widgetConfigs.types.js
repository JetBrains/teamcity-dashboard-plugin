// @flow strict

import type { WidgetType } from './widgets.types'

export type Component = () => React$Node

export type WidgetConfig = {
	name: string,
	Header: Component,
	settings: Component,
	Body: Component,
	headerOptions?: Component[],
	minWidth?: number,
	minHeight?: number,
	openSettingsFirst?: boolean,
	...
}

export type WidgetConfigs = {|
	[type: WidgetType]: WidgetConfig
|}
