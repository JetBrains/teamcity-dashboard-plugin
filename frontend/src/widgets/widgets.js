// @flow strict
import InvestigationsWidgetBody from './InvestigationsWidget/components/InvestigationsWidgetBody/InvestigationsWidgetBody'
import InvestigationsWidgetSettings from './InvestigationsWidget/components/InvestigationsWidgetSettings/InvestigationsWidgetSettings'
import BuildTypeChangesWidget from './BuildTypeChangesWidget/BuildTypeChangesWidget'
import type { WidgetType } from '../features/widgets/widgets.types'
import InvestigationsWidgetHeader from './InvestigationsWidget/components/InvestigationsWidgetHeader/InvestigationsWidgetHeader'
import BuildTypeChangesWidgetHeader from './BuildTypeChangesWidget/components/BuildTypeChangesWidgetHeader/BuildTypeChangesWidgetHeader'
import CollapseAllExpandAllButton from './BuildTypeChangesWidget/components/CollapseAllExpandAllButton/CollapseAllExpandAllButton'
import BuildTypeChangesWidgetSettings
	from './BuildTypeChangesWidget/components/BuildTypeChangesWidgetSettings/BuildTypeChangesWidgetSettings'

type WidgetProperties = {|
	widgetId: string,
|}

export type WidgetComponent = (props: WidgetProperties) => React$Node

export type Component = () => React$Node

export type Widget = {
	name: string,
	Header: Component,
	settings: Component,
	Body: Component,
	headerOptions?: Component[],
	...
}

const widgets: {| [widgetType: WidgetType]: Widget |} = {
	investigationsWidget: {
		name: 'My Investigations',
		Header: InvestigationsWidgetHeader,
		Body: InvestigationsWidgetBody,
		settings: InvestigationsWidgetSettings,
	},
	buildTypeChangesWidget: {
		name: 'BuildType Changes Widget',
		// eslint-disable-next-line react/display-name
		Header: BuildTypeChangesWidgetHeader,
		Body: BuildTypeChangesWidget,
		settings: BuildTypeChangesWidgetSettings,
		// $FlowFixMe
		headerOptions: [CollapseAllExpandAllButton],
	},
}

export const getWidgetSettingsComponent = (
	type: WidgetType
): ?Component => widgets[type]?.settings

export default widgets
