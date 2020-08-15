// @flow strict
import React, { useMemo } from 'react'
import widgets, {
	getWidgetBodyComponent,
	getWidgetComponent,
} from '../../widgets/widgets'
import { useWidgetType } from '../../features/widgets/widgets.hooks'
import WidgetEllipsisOptions from '../WidgetEllipsisOptions/WidgetEllipsisOptions'
import WidgetBody from '../WidgetBody/WidgetBody'
import CollapseProvider from '../CollapseProvider/CollapseProvider'
import BuildTypeChanges from '../BuildTypeChanges/BuildTypeChanges'
import WidgetIsland from '../WidgetIsland/WidgetIsland'
import ThisWidgetGeneralDataProvider from '../../features/widgets/components/ThisWidgetGeneralDataProvider/ThisWidgetGeneralDataProvider'
import type { WidgetId } from '../../features/widgets/widgets.types'

interface Properties {
	widgetId: WidgetId;
}

const WidgetWrapper = React.memo<Properties>(({ widgetId }: Properties) => {
	const type = useWidgetType(widgetId)

	const widget = type ? widgets[type] : undefined

	const headerOptions = useMemo(
		() => [<WidgetEllipsisOptions key={0} widgetId={widgetId} />],
		[widgetId]
	)

	return (
		<ThisWidgetGeneralDataProvider
			// FIXME: this is a dumb fix. but without it flow for some reason gets angry
			thisWidgetId={widgetId ?? undefined}
			thisWidgetType={type}
		>
			<WidgetIsland
				title={
					widget?.Header ? <widget.Header /> : <span>Loading...</span>
				}
				headerOptions={headerOptions}
			>
				{widget?.Body ? (
					<widget.Body />
				) : (
					<span>Error loading widget body</span>
				)}
			</WidgetIsland>
		</ThisWidgetGeneralDataProvider>
	)
	// return WidgetComponent ? (
	// 	<WidgetComponent widgetId={widgetId} />
	// ) : (
	// 	<div>Widget Loading</div>
	// )
})

WidgetWrapper.displayName = 'WidgetWrapper'

export default WidgetWrapper
