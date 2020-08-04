// @flow strict
import React, { useMemo } from 'react'
import ReactGridLayout from 'react-grid-layout'
import useLayoutData from '../../hooks/useLayoutData'
import { useSelector } from 'react-redux'
import { selectAllWidgetIds } from '../../store/slices/widgetsSlice'
import './style.css'
import WidgetWrapper from '../WidgetWrapper/WidgetWrapper'

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
		<ReactGridLayout
			handle
			width={1000}
			cols={12}
			rowHeight={30}
			layout={layout}
			style={{ position: 'relative' }}
			draggableHandle=".draggable-handle"
			onLayoutChange={setLayout}
		>
			{children}
		</ReactGridLayout>
	)
}

export default Grid
