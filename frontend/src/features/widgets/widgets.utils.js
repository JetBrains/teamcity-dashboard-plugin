// @flow strict

import type { WidgetData, WidgetId, WidgetType } from './widgets.types'

const HIDDEN_WIDGET_ID_PREFIX = '$hidden'

export const makeHiddenWidgetId = (actualId: WidgetId): WidgetId => {
	return `${HIDDEN_WIDGET_ID_PREFIX}_${actualId}`
}

export const filterVisibleWidgetIds = (ids: WidgetId[]): WidgetId[] =>
	ids.filter((id) => !id.startsWith(HIDDEN_WIDGET_ID_PREFIX))

export const createEmptyWidgetData = (
	id: WidgetId,
	type: WidgetType
	// $FlowFixMe
): WidgetData => ({
	id,
	type,
	data: {},
})
