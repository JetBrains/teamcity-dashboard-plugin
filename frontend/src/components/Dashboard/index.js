// @flow strict
import React from 'react'
import { useSelector } from 'react-redux'
import {
	selectWidgetWithOpenedSettings,
} from '../../store/slices/widgetsSlice'
import Grid from '../Grid'
import WidgetSettings from '../WidgetSettings'
import AddWidget from '../AddWidget/AddWidget'

const Dashboard = () => {
	const widgetWithOpenedSettings = useSelector(selectWidgetWithOpenedSettings)

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
