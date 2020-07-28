// @flow strict
import { type DashboardData } from '../commontypes'
import TC from '@teamcity/react-api'

// TODO: should fetch data from server
export async function getDashboardDataFromServer(): Promise<DashboardData> {
	console.log('Trying to fetch from server')
	return await TC.requestJSON('/dashboardData.html')
}

// TODO: should post data to server
export async function postDashboardDataToServer(
	data: DashboardData
): Promise<void> {
	await fetch('/dashboardData.html', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}
