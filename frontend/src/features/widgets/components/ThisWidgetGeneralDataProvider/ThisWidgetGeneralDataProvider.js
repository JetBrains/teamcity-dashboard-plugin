// @flow strict
import React from 'react'
import type { WidgetId, WidgetType } from '../../widgets.types'
import thisWidgetTypeContext from './thisWidgetType.context'
import thisWidgetIdContext from './thisWidgetId.context'

interface Properties {
	children: React$Node;
	thisWidgetId: ?WidgetId;
	thisWidgetType: ?WidgetType;
}

const ThisWidgetGeneralDataProvider = ({
	children,
	thisWidgetId,
	thisWidgetType,
}: Properties) => {
	return (
		<thisWidgetIdContext.Provider value={thisWidgetId}>
			<thisWidgetTypeContext.Provider value={thisWidgetType}>
				{children}
			</thisWidgetTypeContext.Provider>
		</thisWidgetIdContext.Provider>
	)
}

export default ThisWidgetGeneralDataProvider
