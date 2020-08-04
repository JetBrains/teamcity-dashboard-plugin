// @flow strict
import React, { useMemo } from 'react'
import type { WidgetId } from '../../store/slices/widgetsSlice'
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown'
import { MoreOptionsIcon } from '@jetbrains/ring-ui/components/icon'
import TC from '@teamcity/react-api'
import PopupMenu from '@jetbrains/ring-ui/components/popup-menu/popup-menu'
import RemoveWidgetButton from '../RemoveWidgetButton/RemoveWidgetButton'
import List from '@jetbrains/ring-ui/components/list/list'

const { IconButton } = TC.Components

const directions = [
	PopupMenu.PopupProps.Directions.BOTTOM_LEFT,
	PopupMenu.PopupProps.Directions.TOP_LEFT,
	PopupMenu.PopupProps.Directions.BOTTOM_RIGHT,
	PopupMenu.PopupProps.Directions.TOP_RIGHT,
]

interface Properties {
	widgetId: WidgetId;
}

const WidgetEllipsisOptions = ({ widgetId }: Properties) => {
	const data = useMemo(
		() => [
			{
				label: <RemoveWidgetButton widgetId={widgetId} />,
				key: '0',
				rgItemType: List.ListProps.Type.ITEM,
			},
		],
		[widgetId]
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
