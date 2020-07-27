// @flow
import React, { useMemo } from 'react'
import ReactGridLayout from 'react-grid-layout'
import useLayoutData from '../../hooks/useLayoutData'
import Island, {
	Header,
	Content,
} from '@jetbrains/ring-ui/components/island/island'
import Widget from '../widgets'
import { useSelector } from 'react-redux'
import { selectAllWidgetIds } from '../../store/slices/widgetsSlice'
import './style.css'

const Grid = () => {
	const [layout, setLayout] = useLayoutData()
	const widgetIds = useSelector(selectAllWidgetIds)

	const children = useMemo(() => {
		return widgetIds.map((id: string) => (
			<div key={id}>
				<Island style={{ width: '100%', height: '100%' }}>
					<Header border className="draggable-handle">
						Widget
					</Header>
					<Content>
						<Widget id={id} />
					</Content>
				</Island>
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
