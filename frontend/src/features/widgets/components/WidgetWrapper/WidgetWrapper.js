// @flow strict
import React, { useMemo } from 'react'
import { useWidgetType } from '../../widgets.hooks'
import WidgetEllipsisOptions from '../WidgetHeaderOptions/WidgetEllipsisOptions/WidgetEllipsisOptions'
import ThisWidgetGeneralDataProvider from '../ThisWidgetGeneralDataProvider/ThisWidgetGeneralDataProvider'
import type { WidgetId, WidgetType } from '../../widgets.types'
import ErrorLoadingWidgetBodyMessage from '../ErrorLoadingWidgetBodyMessage/ErrorLoadingWidgetBodyMessage'
import SimpleTextWidgetHeader from '../SimpleTextWidgetHeader/SimpleTextWidgetHeader'
import {
	getWidgetBodyComponent,
	getWidgetHeaderComponent,
	getWidgetHeaderOptions,
} from '../../config/widgetComponents.helpers'
import MeasuredWidgetIsland from './MeasuredWidgetIsland/MeasuredWidgetIsland'

interface Properties {
	widgetId: WidgetId;
}

const WidgetWrapper = React.memo<Properties>(({ widgetId }: Properties) => {
	const type: ?WidgetType = useWidgetType(widgetId)

	const widgetHeaderOptions = type ? getWidgetHeaderOptions(type) : []

	const headerOptions = useMemo(
		() =>
			[
				...widgetHeaderOptions,
				WidgetEllipsisOptions,
			].map((Component, i) => <Component key={i} />),
		[widgetHeaderOptions]
	)

	const Header = type ? getWidgetHeaderComponent(type) : undefined
	const Body = type ? getWidgetBodyComponent(type) : undefined

	return (
		<ThisWidgetGeneralDataProvider
			// FIXME: this is a dumb fix. but without it flow for some reason gets angry
			thisWidgetId={widgetId ?? undefined}
			thisWidgetType={type}
		>
			<MeasuredWidgetIsland
				title={
					Header ? (
						<Header />
					) : (
						<SimpleTextWidgetHeader>!</SimpleTextWidgetHeader>
					)
				}
				headerOptions={headerOptions}
			>
				{Body ? (
					<Body />
				) : (
					<ErrorLoadingWidgetBodyMessage />
				)}
			</MeasuredWidgetIsland>
		</ThisWidgetGeneralDataProvider>
	)
})

WidgetWrapper.displayName = 'WidgetWrapper'

export default WidgetWrapper
