// @flow strict
import React from 'react'
import type { WidgetId, WidgetType } from '../../widgets.types'
import ThisWidgetTypeContext from './ThisWidgetType.context'
import ThisWidgetIdContext from './ThisWidgetId.context'

type Properties = {|
	children: React$Node,
	thisWidgetId: ?WidgetId,
	thisWidgetType: ?WidgetType,
|}

const ThisWidgetGeneralDataProvider = ({
	children,
	thisWidgetId,
	thisWidgetType,
}: Properties) => {
	return (
		<ThisWidgetIdContext.Provider value={thisWidgetId}>
			<ThisWidgetTypeContext.Provider value={thisWidgetType}>
				{children}
			</ThisWidgetTypeContext.Provider>
		</ThisWidgetIdContext.Provider>
	)
}

export default ThisWidgetGeneralDataProvider
