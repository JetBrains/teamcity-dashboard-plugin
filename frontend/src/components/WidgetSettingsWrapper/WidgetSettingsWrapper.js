// @flow strict
import React from 'react'
import { getWidgetSettingsComponent } from '../../widgets/widgets'
import type { WidgetId } from '../../features/widgets/widgets.types'
import { useWidgetType } from '../../features/widgets/widgets.hooks'
import ThisWidgetGeneralDataProvider from '../../features/widgets/components/ThisWidgetGeneralDataProvider/ThisWidgetGeneralDataProvider'

interface Properties {
	widgetId: WidgetId;
}

const WidgetSettingsWrapper = ({ widgetId }: Properties) => {
	const type = useWidgetType(widgetId)
	const Settings = getWidgetSettingsComponent(type)
	// return Settings && <Settings widgetId={widgetId} />
	return (
		<ThisWidgetGeneralDataProvider
			thisWidgetId={widgetId ?? undefined}
			thisWidgetType={type}
		>
			{Settings ? <Settings widgetId={widgetId} /> : <span>Smth</span>}
		</ThisWidgetGeneralDataProvider>
	)
}

export default WidgetSettingsWrapper
