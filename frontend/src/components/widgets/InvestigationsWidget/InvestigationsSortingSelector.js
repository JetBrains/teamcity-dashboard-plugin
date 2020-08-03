// @flow strict
import React from 'react'
import PopupMenu from '@jetbrains/ring-ui/components/popup-menu/popup-menu'
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown'
import Button from '@jetbrains/ring-ui/components/button/button'
import useWidgetData from '../../../hooks/useWidgetData'

interface Properties {
	widgetId: string;
}

const directions = [
	PopupMenu.PopupProps.Directions.BOTTOM_LEFT,
	PopupMenu.PopupProps.Directions.BOTTOM_RIGHT,
]

type Option = {
	label: string,
	sortBy: 'time' | 'name',
	...
}

const data: Option[] = [
	{ label: 'By time', sortBy: 'time' },
	{ label: 'By name', sortBy: 'name' },
]

// $FlowFixMe
const InvestigationsSortingSelector = React.memo(({ widgetId }: Properties) => {
	const [widgetData, setWidgetData] = useWidgetData(widgetId)

	const sortingMethod = widgetData.data.sortBy ?? 'time'

	const onSelect = (item: Option) => {
		setWidgetData({
			...widgetData,
			data: {
				...widgetData.data,
				sortBy: item.sortBy,
			},
		})
	}

	return (
		<Dropdown
			hoverMode
			anchor={
				<Button>
					{sortingMethod === 'time' ? 'By time' : 'By name'}
				</Button>
			}
		>
			<PopupMenu
				closeOnSelect
				data={data}
				directions={directions}
				onSelect={onSelect}
			/>
		</Dropdown>
	)
})

InvestigationsSortingSelector.displayName = 'InvestigationsSortingSelector'

export default InvestigationsSortingSelector
