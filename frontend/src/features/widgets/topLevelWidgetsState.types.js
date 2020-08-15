// @flow strict

import type { Json } from '../../commontypes'
import type { WidgetType } from './widgets.types'

export type TopLevelWidgetState = {|
	[key: string]: Json,
|}

export type TopLevelWidgetsStateState = {|
	[type: WidgetType]: TopLevelWidgetState,
	$global: TopLevelWidgetState,
|}

export type SetTopLevelWidgetsStateActionPayload<T: Json> = {|
	type: WidgetType | '$global',
	propertyName: string,
	propertyValue: T,
|}
