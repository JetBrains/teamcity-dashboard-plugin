// @flow strict
import { type DashboardData } from '../commontypes'
import TC from '@teamcity/react-api'
import type { WidgetData } from '../features/widgets/widgets.types'

// $FlowFixMe
const parseWidget = ({ id, type, data }: WidgetData): WidgetData => ({
	id,
	type,
	data,
})

const parseDashboardData = ({
	layout,
	widgets,
}: DashboardData): DashboardData => ({
	layout,
	widgets: widgets.map((widget) => parseWidget(widget)),
})

// TODO: should fetch data from server
export async function getDashboardDataFromServer(): Promise<DashboardData> {
	console.log('Trying to fetch from server')
	return parseDashboardData(await TC.requestJSON('/dashboardData.html'))
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
