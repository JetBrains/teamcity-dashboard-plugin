// @flow strict
import React, { useMemo } from 'react'
import ReactGridLayout, { WidthProvider } from 'react-grid-layout'
import { useSelector } from 'react-redux'
import { selectAllWidgetIds } from '../../store/slices/widgetsSlice'
import './style.css'
import WidgetWrapper from '../WidgetWrapper/WidgetWrapper'
import useLayoutData from '../../hooks/layout/useLayoutData'

const ResponsiveGridLayout = WidthProvider(ReactGridLayout)

const Grid = () => {
	const [layout, setLayout] = useLayoutData()

	const widgetIds = useSelector(selectAllWidgetIds)

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
		>
			{children}
		</ResponsiveGridLayout>
	)
}

export default Grid
