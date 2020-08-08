// @flow strict
import React from 'react'
import type { WidgetId } from '../../store/slices/widgetsSlice'
import { getWidgetSettingsComponent } from '../../widgets/widgets'
import useWidgetType from '../../hooks/widgets/useWidgetType'

interface Properties {
	widgetId: WidgetId;
}

const WidgetSettingsWrapper = ({widgetId}: Properties) => {
	const type = useWidgetType(widgetId)
	const Settings = getWidgetSettingsComponent(type)
	return Settings && <Settings widgetId={widgetId} />
}

export default WidgetSettingsWrapper
