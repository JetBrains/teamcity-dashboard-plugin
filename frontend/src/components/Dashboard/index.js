// @flow strict
import React from 'react'
import { useDispatch } from 'react-redux'
import { addWidget } from '../../store/slices/widgetsSlice'
import Grid from '../Grid'
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown'
import Button from '@jetbrains/ring-ui/components/button/button'
import PopupMenu from '@jetbrains/ring-ui/components/popup-menu/popup-menu'

const Dashboard = () => {
	const dispatch = useDispatch()

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
				<PopupMenu
					closeOnSelect
					data={data}
					onSelect={onSelect}
				/>
			</Dropdown>
			<Grid />
		</>
	)
}

export default Dashboard
