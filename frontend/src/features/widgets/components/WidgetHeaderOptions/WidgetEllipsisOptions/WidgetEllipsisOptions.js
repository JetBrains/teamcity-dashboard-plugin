// @flow strict
import React, { useMemo } from 'react'
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown'
import {
	CopyIcon,
	MarkerIcon,
	MoreOptionsIcon,
	TrashIcon,
} from '@jetbrains/ring-ui/components/icon'
import TC from '@teamcity/react-api'
import PopupMenu from '@jetbrains/ring-ui/components/popup-menu/popup-menu'
import List from '@jetbrains/ring-ui/components/list/list'
import styles from './WidgetEllipsisOptions.css'
import {
	useCloneThisWidget,
	useRemoveThisWidget,
	useThisWidgetType,
} from '../../../widgets.hooks'
import { useOpenThisWidgetSettings } from '../../../widgetSettings.hooks'
import { widgetHasSettings } from '../../../config/widgetProperties.helpers'

const { IconButton } = TC.Components

const directions = [
	PopupMenu.PopupProps.Directions.BOTTOM_LEFT,
	PopupMenu.PopupProps.Directions.TOP_LEFT,
	PopupMenu.PopupProps.Directions.BOTTOM_RIGHT,
	PopupMenu.PopupProps.Directions.TOP_RIGHT,
]

const WidgetEllipsisOptions = () => {
	const type = useThisWidgetType()
	const openWidgetSettings = useOpenThisWidgetSettings()
	const removeWidget = useRemoveThisWidget()
	const cloneWidget = useCloneThisWidget()

	const data = useMemo(
		() =>
			[
				{
					label: 'Clone widget',
					action: 'cloneWidget',
					key: 'clone',
					rgItemType: List.ListProps.Type.ITEM,
					glyph: CopyIcon,
					onClick: cloneWidget,
				},
				widgetHasSettings(type) && {
					label: 'Edit...',
					action: 'openSettings',
					key: 'settings',
					rgItemType: List.ListProps.Type.ITEM,
					glyph: MarkerIcon,
					onClick: openWidgetSettings,
				},
				{
					key: 'separator',
					rgItemType: List.ListProps.Type.SEPARATOR,
					action: '',
				},
				{
					label: 'Remove',
					action: 'removeWidget',
					key: 'remove',
					rgItemType: List.ListProps.Type.ITEM,
					glyph: TrashIcon,
					color: 'red',
					onClick: removeWidget,
					className: styles.danger,
				},
			].filter(Boolean),
		[cloneWidget, openWidgetSettings, removeWidget, type]
	)

	return (
		<Dropdown
			hoverMode
			anchor={
				<IconButton title="Widget Options" icon={MoreOptionsIcon} />
			}
		>
			<PopupMenu closeOnSelect data={data} directions={directions} />
		</Dropdown>
	)
}

export default WidgetEllipsisOptions
