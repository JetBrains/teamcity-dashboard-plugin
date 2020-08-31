// @flow strict
import type { WidgetId } from './widgets.types'
import type { BreakpointName } from './config/widgetProperties.types'

export type WidgetBreakpointsEntity = {|
	id: WidgetId,
	currentBreakpoint: ?BreakpointName,
	activeBreakpoints: BreakpointName[],
|}

export type WidgetsBreakpointsState = {|
	ids: WidgetId[],
	entities: {|
		[id: WidgetId]: WidgetBreakpointsEntity,
	|}
|}

