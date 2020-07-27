import React from 'react'
import { useDispatch } from 'react-redux'
import { addWidget } from '../../store/slices/widgetsSlice'
import Grid from '../Grid'

const Dashboard = () => {
	const dispatch = useDispatch()

	const onAddClick = () =>
		dispatch(
			addWidget({
				type: 'number',
				data: {
					value: '77',
				},
			})
		)

	return (
		<>
			<button onClick={onAddClick}>Add a widget</button>
			<Grid />
		</>
	)
}

export default Dashboard
