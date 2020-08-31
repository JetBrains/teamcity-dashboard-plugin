// @flow strict

import type { WidgetId } from './widgets.types'

export type WidgetDimensionsEntity = {|
	id: WidgetId,
	width: ?number,
|}

export type WidgetsDimensionsState = {|
	ids: WidgetId[],
	entities: {|
		[id: WidgetId]: WidgetDimensionsEntity,
	|}
|}

export type WidgetMeasuredDimensions = {
	width?: number,
	...
}
