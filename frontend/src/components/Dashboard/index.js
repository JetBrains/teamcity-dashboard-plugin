// @flow strict
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectWidgetWithOpenedSettings,
} from '../../store/slices/widgetsSlice'
import Grid from '../Grid'
import WidgetSettings from '../WidgetSettings'
import AddWidget from '../AddWidget/AddWidget'
import { fetchDashboardData } from '../../store/slices/fetchingDashboardData'

const Dashboard = () => {
	const widgetWithOpenedSettings = useSelector(selectWidgetWithOpenedSettings)
	const dispatch = useDispatch()
	dispatch(fetchDashboardData())

	return (
		<>
			<AddWidget />
			{widgetWithOpenedSettings === null ||
			widgetWithOpenedSettings === undefined ? undefined : (
				<WidgetSettings id={widgetWithOpenedSettings} />
			)}
			<Grid />
		</>
	)
}

export default Dashboard
