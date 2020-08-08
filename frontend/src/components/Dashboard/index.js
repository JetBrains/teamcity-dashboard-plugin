// @flow strict
import React from 'react'
import { useDispatch } from 'react-redux'
import Grid from '../Grid'
import AddWidget from '../AddWidget/AddWidget'
import { fetchDashboardData } from '../../store/slices/fetchingDashboardData'
import WidgetSettingsDialog from '../WidgetSettingsDialog/WidgetSettingsDialog'

const Dashboard = () => {
	const dispatch = useDispatch()
	dispatch(fetchDashboardData())

	return (
		<>
			<AddWidget />
			<WidgetSettingsDialog />
			<Grid />
		</>
	)
}

export default Dashboard
