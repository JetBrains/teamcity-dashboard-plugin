// @flow strict
import React, { useMemo, useCallback } from 'react'
import Button from '@jetbrains/ring-ui/components/button/button'
import PopupMenu from '@jetbrains/ring-ui/components/popup-menu/popup-menu'
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown'
import widgets from '../../../../widgets/widgets'
import type { Widget } from '../../../../widgets/widgets'
import type { WidgetType } from '../../../widgets/widgets.types'
import { useStartAddingNewWidget } from '../../../widgets/widgetSettings.hooks'

type Option = {|
	label: string,
	type: WidgetType,
|}
// TODO: weird because widgets is exact
// $FlowFixMe
const data: Option[] = Object.entries(widgets).map(
	([type, widget]: [string, Widget]) => ({
		label: widget.name,
		type,
	})
)

const AddWidget = () => {
	const addWidget = useStartAddingNewWidget()
	const anchor = useMemo(() => <Button delayed>Add a widget</Button>, [])

	const onSelect = useCallback(({ type }: Option) => addWidget(type), [
		addWidget,
	])

	return (
		<Dropdown anchor={anchor}>
			<PopupMenu closeOnSelect data={data} onSelect={onSelect} />
		</Dropdown>
	)
}

export default AddWidget
