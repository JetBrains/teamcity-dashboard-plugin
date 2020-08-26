// @flow strict
import React, { useMemo, useCallback } from 'react'
import Button from '@jetbrains/ring-ui/components/button/button'
import PopupMenu from '@jetbrains/ring-ui/components/popup-menu/popup-menu'
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown'
import type { WidgetType } from '../../../widgets/widgets.types'
import { useStartAddingNewWidget } from '../../../widgets/widgetSettings.hooks'
import {
	getWidgetName,
	shouldWidgetOpenSettingsFirst,
	supportedWidgetTypes,
} from '../../../widgets/widgetConfigs.utils'

type Option = {|
	label: string,
	type: WidgetType,
|}

const data: Option[] = supportedWidgetTypes.map((type) => ({
	label: getWidgetName(type),
	type,
}))

const AddWidget = () => {
	const addWidget = useStartAddingNewWidget()
	const anchor = useMemo(() => <Button delayed>Add a widget</Button>, [])

	const onSelect = useCallback(
		({ type }: Option) =>
			addWidget(type, shouldWidgetOpenSettingsFirst(type)),
		[addWidget]
	)

	return (
		<Dropdown anchor={anchor}>
			<PopupMenu closeOnSelect data={data} onSelect={onSelect} />
		</Dropdown>
	)
}

export default AddWidget
