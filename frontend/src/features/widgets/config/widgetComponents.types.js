// @flow strict

import type { WidgetType } from '../widgets.types'

export type Component = () => React$Node

export type WidgetComponents = {|
	Header: Component,
	Settings?: Component,
	Body: Component,
	headerOptions?: Component[],
|}

export type AllWidgetsComponents = {|
	[type: WidgetType]: WidgetComponents,
|}
