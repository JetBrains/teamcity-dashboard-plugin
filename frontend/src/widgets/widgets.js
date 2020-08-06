// @flow strict
import InvestigationsWidget from './InvestigationsWidget/InvestigationsWidget'
import type { WidgetType } from '../store/slices/widgetsSlice'

type WidgetProperties = {|
	widgetId: string,
|}

export type WidgetComponent = (props: WidgetProperties) => React$Node

export type Widget = {
	name: string,
	component: WidgetComponent,
	...
}

const widgets: {| [widgetType: WidgetType]: Widget |} = {
	investigationsWidget: {
		name: 'My Investigations',
		component: InvestigationsWidget,
	},
}

export const getWidgetComponent = (type: WidgetType): ?WidgetComponent =>
	widgets[type]?.component

export default widgets
