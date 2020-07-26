// @flow
import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import useLayoutData from '../../hooks/useLayoutData';
import {type GridElementData} from '../../store/slices/layoutSlice';
import Island from '@jetbrains/ring-ui/components/island/island';
import Widget from '../widgets';

const Grid = () => {
	const [layout, setLayout] = useLayoutData();
	return (
		<ReactGridLayout
			width={1000}
			cols={12}
			rowHeight={30}
			layout={layout}
			onLayoutChange={setLayout}
		>
			{layout.map((element: GridElementData) => (
				<div key={element.i}>
					<Island style={{width: '100%', height: '100%'}}>
						<Widget id={element.i}/>
					</Island>
				</div>
			))}
		</ReactGridLayout>
	);
};

export default Grid;
