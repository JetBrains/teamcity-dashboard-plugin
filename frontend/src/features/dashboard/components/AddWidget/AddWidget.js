// @flow strict
import React, { useMemo, useCallback } from 'react'
import Button from '@jetbrains/ring-ui/components/button/button'
import PopupMenu from '@jetbrains/ring-ui/components/popup-menu/popup-menu'
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown'
import type { WidgetType } from '../../../widgets/widgets.types'

import { useDispatch } from 'react-redux'
import { openWidgetSettings } from '../../../widgets/widgetSettings.slice'
import { addWidget } from '../../../widgets/widgets.slice'
import {
	getWidgetName,
	shouldWidgetOpenSettingsFirst,
	supportedWidgetTypes,
} from '../../../widgets/config/widgetProperties.helpers'

const useOnSelect = (): ((Option) => void) => {
	const dispatch = useDispatch()

	return useCallback(({type}: Option) => {
		if (shouldWidgetOpenSettingsFirst(type)) {
			dispatch(openWidgetSettings({
				type,
				isNew: true,
			}))
		} else {
			dispatch(addWidget(type))
		}

	}, [dispatch])
}

type Option = {|
	label: string,
	type: WidgetType,
|}

const data: Option[] = supportedWidgetTypes.map((type) => ({
	label: getWidgetName(type),
	type,
}))

const AddWidget = () => {
	const onSelect = useOnSelect()
	const anchor = useMemo(() => <Button delayed>Add a widget</Button>, [])

	return (
		<Dropdown anchor={anchor}>
			<PopupMenu closeOnSelect data={data} onSelect={onSelect} />
		</Dropdown>
	)
}

export default AddWidget
