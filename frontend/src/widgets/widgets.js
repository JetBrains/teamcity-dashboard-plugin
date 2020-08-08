// @flow strict
import InvestigationsWidget from './InvestigationsWidget/InvestigationsWidget'
import type { WidgetType } from '../store/slices/widgetsSlice'
import InvestigationsWidgetSettings from './InvestigationsWidget/settings/InvestigationsWidgetSettings/InvestigationsWidgetSettings'

type WidgetProperties = {|
	widgetId: string,
|}

export type WidgetComponent = (props: WidgetProperties) => React$Node

export type Widget = {
	name: string,
	component: WidgetComponent,
	settings: WidgetComponent,
	...
}

const widgets: {| [widgetType: WidgetType]: Widget |} = {
	investigationsWidget: {
		name: 'My Investigations',
		component: InvestigationsWidget,
		settings: InvestigationsWidgetSettings,
	},
}

export const getWidgetComponent = (type: WidgetType): ?WidgetComponent =>
	widgets[type]?.component

export const getWidgetSettingsComponent = (
	type: WidgetType
): ?WidgetComponent => widgets[type]?.settings

export default widgets
