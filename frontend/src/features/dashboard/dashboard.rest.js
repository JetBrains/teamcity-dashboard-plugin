// @flow strict
import type { WidgetData, WidgetId, WidgetType } from '../widgets/widgets.types'
import TC from '@teamcity/react-api'
import type { DashboardData } from './dashboard.types'
import type { LayoutElementData } from './layout.types'
import { getWidgetDimensionsProperties } from '../widgets/config/widgetProperties.helpers'

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
	widgets: WidgetData[],
	...
}

const parseLayoutElementData = (
	{ i, x, y, w, h }: FetchedLayoutElementData,
	type: WidgetType
): LayoutElementData => {
	const { minHeight, minWidth } = getWidgetDimensionsProperties(type)
	return { i, x, y, w, h, minH: minHeight, minW: minWidth }
}

const prepareLayoutElementData = ({
	i,
	x,
	y,
	w,
	h,
}: LayoutElementData): FetchedLayoutElementData => ({ i, x, y, w, h })

const parseDashboardData = ({
	layout,
	widgets,
}: FetchedDashboardData): DashboardData => {
	const widgetIdToType: { [id: WidgetId]: WidgetType, ... } = {}

	for (const widget of widgets) {
		widgetIdToType[widget.id] = widget.type
	}

	const parsedLayout: LayoutElementData[] = layout
		.map(
			// TODO: $FlowFixMe
			// $FlowFixMe
			(element): ?LayoutElementData =>
				widgetIdToType[element.i] !== null &&
				widgetIdToType[element.i] !== undefined
					? parseLayoutElementData(element, widgetIdToType[element.i])
					: undefined
		)
		.filter((x) => x !== null && x !== undefined)

	return {
		layout: parsedLayout,
		widgets,
	}
}

const prepareDashboardData = ({
	layout,
	widgets,
}: DashboardData): FetchedDashboardData => ({
	layout: layout.map((element) => prepareLayoutElementData(element)),
	widgets: widgets,
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
