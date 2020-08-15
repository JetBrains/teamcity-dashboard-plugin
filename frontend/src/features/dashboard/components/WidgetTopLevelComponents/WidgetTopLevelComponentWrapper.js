// @flow strict
import React, {Fragment} from 'react'
import type { WidgetType } from '../../../widgets/widgets.types'
import widgets from '../../../../widgets/widgets'
import ThisWidgetGeneralDataProvider from '../../../widgets/components/ThisWidgetGeneralDataProvider/ThisWidgetGeneralDataProvider'

interface Properties {
	type: WidgetType;
}

const WidgetTopLevelComponentWrapper = ({ type }: Properties): React$Node => {
	const widget = widgets[type]
	return (
		widget?.TopLevelComponent ? (
			<ThisWidgetGeneralDataProvider
				thisWidgetId={undefined}
				thisWidgetType={type}
			>
				<widget.TopLevelComponent />
			</ThisWidgetGeneralDataProvider>
		) : <Fragment />
	)
}

export default WidgetTopLevelComponentWrapper
