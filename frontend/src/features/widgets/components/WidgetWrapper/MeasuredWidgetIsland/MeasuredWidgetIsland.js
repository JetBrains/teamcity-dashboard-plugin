// @flow strict
import React, { useMemo } from 'react'
import type { WidgetIslandProperties } from '../../../../../components/WidgetIsland/WidgetIsland'
import WidgetIsland from '../../../../../components/WidgetIsland/WidgetIsland'
import { withContentRect } from 'react-measure'
import { useSaveThisWidgetWidth } from '../../../widgetsBreakpoints.hooks'

type Properties = {|
	contentRect: ?{
		entry: {
			width: number,
			...
		},
		...
	},
	measureRef: React$Ref<*>,
	title: React$Node,
	headerOptions: React$Node[],
	children: React$Node,
	...WidgetIslandProperties,
|}

const MeasuredWidgetIsland = React.memo(
	({
		contentRect,
		measureRef,
		title,
		headerOptions,
		children,
		...rest
	}: Properties) => {
		const measuredWidth = contentRect?.entry?.width
		useSaveThisWidgetWidth(measuredWidth)

		const isMeasured = measuredWidth !== null && measuredWidth !== undefined

		// eslint-disable-next-line unicorn/no-null
		const actualTitle = useMemo(() => (isMeasured ? title : null), [
			isMeasured,
			title,
		])
		const actualHeaderOptions = useMemo(
			() => (isMeasured ? headerOptions : []),
			[headerOptions, isMeasured]
		)
		// eslint-disable-next-line unicorn/no-null
		const actualBody = useMemo(() => (isMeasured ? children : null), [
			children,
			isMeasured,
		])

		return (
			<WidgetIsland
				mainRef={measureRef}
				title={actualTitle}
				headerOptions={actualHeaderOptions}
				{...rest}
			>
				{actualBody}
			</WidgetIsland>
		)
	}
)

MeasuredWidgetIsland.displayName = 'MeasuredWidgetIsland'

export default withContentRect('bound')(MeasuredWidgetIsland)
