// @flow strict
import React from 'react'
import BuildTypeChangesWidgetBuildTypeSelector from './options/BuildTypeChangesWidgetBuildTypeSelector'
import type { WidgetId } from '../../features/widgets/widgets.types'

interface Properties {
	widgetId: WidgetId;
}

const BuildTypeChangesWidgetSettings = ({ widgetId }: Properties) => {
	return <BuildTypeChangesWidgetBuildTypeSelector widgetId={widgetId} />
}

export default BuildTypeChangesWidgetSettings
