// @flow strict
import React, { useMemo } from 'react'
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown'
import {
	MarkerIcon,
	MoreOptionsIcon,
	TrashIcon,
} from '@jetbrains/ring-ui/components/icon'
import TC from '@teamcity/react-api'
import PopupMenu from '@jetbrains/ring-ui/components/popup-menu/popup-menu'
import List from '@jetbrains/ring-ui/components/list/list'
import styles from './WidgetEllipsisOptions.css'
import { useRemoveWidget, useOpenWidgetSettings, useThisWidgetId } from '../../../widgets.hooks'

const { IconButton } = TC.Components

const directions = [
	PopupMenu.PopupProps.Directions.BOTTOM_LEFT,
	PopupMenu.PopupProps.Directions.TOP_LEFT,
	PopupMenu.PopupProps.Directions.BOTTOM_RIGHT,
	PopupMenu.PopupProps.Directions.TOP_RIGHT,
]

const WidgetEllipsisOptions = () => {
	const widgetId = useThisWidgetId()
	const openWidgetSettings = useOpenWidgetSettings(widgetId)
	const removeWidget = useRemoveWidget(widgetId)

	const data = useMemo(
		() => [
			{
				label: 'Edit...',
				action: 'openSettings',
				key: '0',
				rgItemType: List.ListProps.Type.ITEM,
				glyph: MarkerIcon,
				onClick: openWidgetSettings,
			},
			{ key: '1', rgItemType: List.ListProps.Type.SEPARATOR, action: '' },
			{
				label: 'Remove',
				action: 'removeWidget',
				key: '2',
				rgItemType: List.ListProps.Type.ITEM,
				glyph: TrashIcon,
				color: 'red',
				onClick: removeWidget,
				className: styles.danger,
			},
		],
		[openWidgetSettings, removeWidget]
	)

	return (
		<Dropdown
			hoverMode
			anchor={
				<IconButton title="Widget Options" icon={MoreOptionsIcon} />
			}
		>
			<PopupMenu
				closeOnSelect
				data={data}
				directions={directions}
			/>
		</Dropdown>
	)
}

export default WidgetEllipsisOptions
