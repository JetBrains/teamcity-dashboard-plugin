// @flow strict
import React from 'react'
import { getWidgetComponent } from '../../widgets/widgets'
import useWidgetType from '../../hooks/widgets/useWidgetType'

interface Properties {
	widgetId: string;
}

const WidgetWrapper = React.memo<Properties>(({ widgetId }: Properties) => {
	const type = useWidgetType(widgetId)
	const WidgetComponent = type ? getWidgetComponent(type) : undefined
	return WidgetComponent ? (
		<WidgetComponent widgetId={widgetId} />
	) : (
		<div>Widget Loading</div>
	)
})

WidgetWrapper.displayName = 'WidgetWrapper'

export default WidgetWrapper
