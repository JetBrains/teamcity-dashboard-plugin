// @flow
import React, { useMemo } from 'react'
import ReactGridLayout from 'react-grid-layout'
import useLayoutData from '../../hooks/useLayoutData'
import { type GridElementData } from '../../store/slices/layoutSlice'
import Island, {
	Header,
	Content,
} from '@jetbrains/ring-ui/components/island/island'
import Widget from '../widgets'

const Grid = () => {
	const [layout, setLayout] = useLayoutData()
	const children = useMemo(() => {
		return layout.map((element: GridElementData) => (
			<div key={element.i}>
				<Island style={{ width: '100%', height: '100%' }}>
					<Header border className="draggable-handle">
						Widget
					</Header>
					<Content>
						<Widget id={element.i} />
					</Content>
				</Island>
			</div>
		))
	}, [layout])

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
