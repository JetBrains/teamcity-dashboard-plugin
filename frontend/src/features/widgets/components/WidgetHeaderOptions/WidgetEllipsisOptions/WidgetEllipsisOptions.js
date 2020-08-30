// @flow strict
import React, { useMemo } from 'react'
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown'
import {
	CopyIcon,
	MoreOptionsIcon,
	PencilIcon,
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
import {
	isWidgetCloneable,
	widgetHasSettings,
} from '../../../config/widgetProperties.helpers'

const { IconButton } = TC.Components

const directions = [
	PopupMenu.PopupProps.Directions.BOTTOM_LEFT,
	PopupMenu.PopupProps.Directions.TOP_LEFT,
	PopupMenu.PopupProps.Directions.BOTTOM_RIGHT,
	PopupMenu.PopupProps.Directions.TOP_RIGHT,
]

const useEllipsisListData = () => {
	const type = useThisWidgetType()
	const openWidgetSettings = useOpenThisWidgetSettings()
	const removeWidget = useRemoveThisWidget()
	const cloneWidget = useCloneThisWidget()

	const safeZoneData = useMemo(
		() =>
			[
				isWidgetCloneable(type) && {
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
					glyph: PencilIcon,
					onClick: openWidgetSettings,
				},
			].filter(Boolean),
		[cloneWidget, openWidgetSettings, type]
	)

	const dangerZoneSeparator = useMemo(
		() => ({
			key: 'dangerZoneSeparator',
			rgItemType: List.ListProps.Type.SEPARATOR,
			action: '',
		}),
		[]
	)

	const removeWidgetListItem = useMemo(
		() => ({
			label: 'Remove',
			action: 'removeWidget',
			key: 'remove',
			rgItemType: List.ListProps.Type.ITEM,
			glyph: TrashIcon,
			color: 'red',
			onClick: removeWidget,
			className: styles.danger,
		}),
		[removeWidget]
	)

	return useMemo(
		() =>
			safeZoneData.length === 0
				? [removeWidgetListItem]
				: [...safeZoneData, dangerZoneSeparator, removeWidgetListItem],
		[dangerZoneSeparator, removeWidgetListItem, safeZoneData]
	)
}

const WidgetEllipsisOptions = () => {
	const data = useEllipsisListData()

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
