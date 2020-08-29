// @flow strict
import React, { useMemo } from 'react'
import ReactGridLayout, { WidthProvider } from 'react-grid-layout'
import { useSelector } from 'react-redux'
import { selectAllVisibleWidgetIds } from '../../features/widgets/widgets.slice'
import './style.css'
import WidgetWrapper from '../../features/widgets/components/WidgetWrapper/WidgetWrapper'
import { useLayoutData } from '../../features/dashboard/layout.hooks'

const ResponsiveGridLayout = WidthProvider(ReactGridLayout)

const margin = [16, 16]

const Grid = () => {
	const [layout, setLayout] = useLayoutData()

	const widgetIds = useSelector(selectAllVisibleWidgetIds)

	const children = useMemo(() => {
		return widgetIds.map((id: string) => (
			<div key={id}>
				<WidgetWrapper widgetId={id} />
			</div>
		))
	}, [widgetIds])

	return (
		<ResponsiveGridLayout
			layout={layout}
			draggableHandle=".draggable-handle"
			onLayoutChange={setLayout}
			cols={10}
			rowHeight={150}
			margin={margin}
			preventCollision
		>
			{children}
		</ResponsiveGridLayout>
	)
}

export default Grid
