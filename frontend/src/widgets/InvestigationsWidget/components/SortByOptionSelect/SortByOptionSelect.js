// @flow strict
import React, { useCallback } from 'react'
import Button from '@jetbrains/ring-ui/components/button/button'
import PopupMenu from '@jetbrains/ring-ui/components/popup-menu/popup-menu'
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown'
import useInvestigationsWidgetSortByOption from '../../../../hooks/widgets/investigationsWidget/useInvestigationsWidgetSortByOption'

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

interface Properties {
	widgetId: string;
	className?: ?string;
}

const SortByOptionSelect = ({ widgetId, className }: Properties) => {
	const [sortBy, setSortBy] = useInvestigationsWidgetSortByOption(widgetId)

	const onSelect = useCallback((option: Option) => setSortBy(option.sortBy), [
		setSortBy,
	])

	return (
		<Dropdown
			hoverMode
			className={className}
			anchor={
				<Button dropdown>
					<span>{sortBy === 'time' ? 'By time' : 'By name'}</span>
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
}

export default SortByOptionSelect
