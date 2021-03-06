// @flow strict

import type { AbstractWidgetData, WidgetId, WidgetType } from './widgets.types'

const HIDDEN_WIDGET_ID_PREFIX = '$hidden'

export const makeHiddenWidgetId = (actualId: WidgetId): WidgetId => {
	return `${HIDDEN_WIDGET_ID_PREFIX}_${actualId}`
}

export const isWidgetHidden = (id: WidgetId) =>
	id.startsWith(HIDDEN_WIDGET_ID_PREFIX)

export const filterVisibleWidgetIds = (ids: WidgetId[]): WidgetId[] =>
	ids.filter((id) => !isWidgetHidden(id))

export const createEmptyWidgetData = <Type : WidgetType>(
	id: WidgetId,
	type: Type
): AbstractWidgetData<Type, {...}> => ({
	id,
	type,
	data: {},
})
