// @flow strict

export type WidgetDimensionsProperties = {|
	defaultWidth?: number,
	defaultHeight?: number,
	minWidth?: number,
	minHeight?: number,
|}

export type WidgetProperties = {|
	name: string,
	openSettingsFirst?: boolean,
	...WidgetDimensionsProperties,
|}
