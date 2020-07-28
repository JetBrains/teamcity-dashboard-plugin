// @flow strict
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	addWidget,
	selectWidgetWithOpenedSettings,
} from '../../store/slices/widgetsSlice'
import Grid from '../Grid'
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown'
import Button from '@jetbrains/ring-ui/components/button/button'
import PopupMenu from '@jetbrains/ring-ui/components/popup-menu/popup-menu'
import WidgetSettings from '../WidgetSettings'

const Dashboard = () => {
	const dispatch = useDispatch()

	const widgetWithOpenedSettings = useSelector(selectWidgetWithOpenedSettings)

	const data = ['Text', 'Number'].map((label) => {
		return {
			label,
			type: label.toLowerCase(),
		}
	})

	const onSelect = ({ type }: { label: string, type: string, ... }) =>
		dispatch(
			addWidget({
				type,
				data: {
					value: '1',
				},
			})
		)

	return (
		<>
			<Dropdown anchor={<Button delayed>Add a widget</Button>}>
				<PopupMenu closeOnSelect data={data} onSelect={onSelect} />
			</Dropdown>
			{widgetWithOpenedSettings === null ||
			widgetWithOpenedSettings === undefined ? undefined : (
				<WidgetSettings id={widgetWithOpenedSettings} />
			)}
			<Grid />
		</>
	)
}

export default Dashboard
