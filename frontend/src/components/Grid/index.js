// @flow strict
import React, { useMemo, useCallback } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { useSelector } from 'react-redux'
import { selectAllWidgetIds } from '../../store/slices/widgetsSlice'
import './style.css'
import WidgetWrapper from '../WidgetWrapper/WidgetWrapper'
import useResponsiveLayoutData from '../../hooks/layout/useResponsiveLayoutData'
import type { Layouts } from '../../hooks/layout/useResponsiveLayoutData'

const ResponsiveGridLayout = WidthProvider(Responsive)

const Grid = () => {
	const [layouts, setLayouts, breakpoints, cols] = useResponsiveLayoutData()

	const onLayoutChange = useCallback(
		(_, layouts: Layouts) => setLayouts(layouts),
		[setLayouts]
	)

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
			breakpoints={breakpoints}
			cols={cols}
			layouts={layouts}
			draggableHandle=".draggable-handle"
			onLayoutChange={onLayoutChange}
		>
			{children}
		</ResponsiveGridLayout>
	)
}

export default Grid
