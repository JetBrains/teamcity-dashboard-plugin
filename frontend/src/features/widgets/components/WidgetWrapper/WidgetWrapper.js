// @flow strict
import React, { useMemo } from 'react'
import widgets from '../../../../widgets/widgets'
import { useWidgetType } from '../../widgets.hooks'
import WidgetEllipsisOptions from '../WidgetHeaderOptions/WidgetEllipsisOptions/WidgetEllipsisOptions'
import WidgetIsland from '../../../../components/WidgetIsland/WidgetIsland'
import ThisWidgetGeneralDataProvider from '../ThisWidgetGeneralDataProvider/ThisWidgetGeneralDataProvider'
import type { WidgetId } from '../../widgets.types'
import ErrorLoadingWidgetBodyMessage from '../ErrorLoadingWidgetBodyMessage/ErrorLoadingWidgetBodyMessage'
import SimpleTextWidgetHeader from '../SimpleTextWidgetHeader/SimpleTextWidgetHeader'

interface Properties {
	widgetId: WidgetId;
}

const WidgetWrapper = React.memo<Properties>(({ widgetId }: Properties) => {
	const type = useWidgetType(widgetId)

	const widget = type ? widgets[type] : undefined

	const widgetHeaderOptions = useMemo(() => widget?.headerOptions ?? [], [
		widget?.headerOptions,
	])

	const headerOptions = useMemo(
		() =>
			[
				...widgetHeaderOptions,
				WidgetEllipsisOptions,
			].map((Component, i) => <Component key={i} />),
		[widgetHeaderOptions]
	)

	return (
		<ThisWidgetGeneralDataProvider
			// FIXME: this is a dumb fix. but without it flow for some reason gets angry
			thisWidgetId={widgetId ?? undefined}
			thisWidgetType={type}
		>
			<WidgetIsland
				title={
					widget?.Header ? (
						<widget.Header />
					) : (
						<SimpleTextWidgetHeader>!</SimpleTextWidgetHeader>
					)
				}
				headerOptions={headerOptions}
			>
				{widget?.Body ? (
					<widget.Body />
				) : (
					<ErrorLoadingWidgetBodyMessage />
				)}
			</WidgetIsland>
		</ThisWidgetGeneralDataProvider>
	)
})

WidgetWrapper.displayName = 'WidgetWrapper'

export default WidgetWrapper
