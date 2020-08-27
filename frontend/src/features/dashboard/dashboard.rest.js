// @flow strict
// $FlowFixMe
import type { WidgetData, WidgetId } from '../widgets/widgets.types'
import type { Json } from '../../commontypes'
import TC from '@teamcity/react-api'
import type { DashboardData } from './dashboard.types'
import type { LayoutElementData } from './layout.types'

type FetchedWidgetData = {
	id: WidgetId,
	type: string,
	data: {|
		[key: string]: Json,
	|},
	...
}

type FetchedLayoutElementData = {
	i: string,
	x: number,
	y: number,
	w: number,
	h: number,
	...
}

type FetchedDashboardData = {
	layout: FetchedLayoutElementData[],
	widgets: FetchedWidgetData[],
	...
}

// TODO: fix flow
// $FlowFixMe
const parseWidgetData = ({
	id,
	type,
	data,
}: FetchedWidgetData): WidgetData => ({ id, type, data })
// $FlowFixMe
const prepareWidgetData = (widget: WidgetData): FetchedWidgetData => widget

const parseLayoutElementData = ({
	i,
	x,
	y,
	w,
	h,
}: FetchedLayoutElementData): LayoutElementData => ({ i, x, y, w, h })

const prepareLayoutElementData: (LayoutElementData) => FetchedLayoutElementData = parseLayoutElementData

const parseDashboardData = ({
	layout,
	widgets,
}: FetchedDashboardData): DashboardData => ({
	layout: layout.map((element) => parseLayoutElementData(element)),
	widgets: widgets.map((widget) => parseWidgetData(widget)),
})

const prepareDashboardData = ({
	layout,
	widgets,
}: DashboardData): FetchedDashboardData => ({
	layout: layout.map((element) => prepareLayoutElementData(element)),
	widgets: widgets.map((widget) => prepareWidgetData(widget)),
})

export const requestDashboardData = async (): Promise<DashboardData> => {
	return parseDashboardData(await TC.requestJSON('/dashboardData.html'))
}

export async function getDashboardDataFromServer(): Promise<DashboardData> {
	return parseDashboardData(await TC.requestJSON('/dashboardData.html'))
}

export async function postDashboardDataToServer(
	data: DashboardData
): Promise<void> {
	await fetch('/dashboardData.html', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(prepareDashboardData(data)),
	})
}
