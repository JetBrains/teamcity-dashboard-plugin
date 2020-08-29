// @flow strict
import React from 'react'
import { useDispatch } from 'react-redux'
import Grid from '../../../../components/Grid'
import WidgetSettingsDialog from '../../../widgets/components/WidgetSettingsDialog/WidgetSettingsDialog'
import { fetchDashboardData } from '../../fetchingDashboardData.slice'
import DashboardHeader from '../DashboardHeader/DashboardHeader'

const Dashboard = () => {
	const dispatch = useDispatch()
	dispatch(fetchDashboardData())

	return (
		<>
			<WidgetSettingsDialog />
			<DashboardHeader />
			<Grid />
		</>
	)
}

export default Dashboard
