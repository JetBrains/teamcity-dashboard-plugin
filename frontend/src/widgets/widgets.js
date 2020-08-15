// @flow strict
import React from 'react'
import InvestigationsWidget from './InvestigationsWidget/InvestigationsWidget'
import InvestigationsWidgetSettings from './InvestigationsWidget/settings/InvestigationsWidgetSettings/InvestigationsWidgetSettings'
import BuildTypeChangesWidget from './BuildTypeChangesWidget/BuildTypeChangesWidget'
import BuildTypeChangesWidgetSettings from './BuildTypeChangesWidget/BuildTypeChangesWidgetSettings'
import type { WidgetType } from '../features/widgets/widgets.types'
import InvestigationsWidgetHeader
	from './InvestigationsWidget/header/InvestigationsWidgetHeader/InvestigationsWidgetHeader'
import TopLevelChangeDetailsPopup from './BuildTypeChangesWidget/TopLevelChangeDetailsPopup/TopLevelChangeDetailsPopup'

type WidgetProperties = {|
	widgetId: string,
|}

export type WidgetComponent = (props: WidgetProperties) => React$Node

export type Component = () => React$Node

export type Widget = {
	name: string,
	Header: Component,
	settings: WidgetComponent,
	Body: Component,
	TopLevelComponent?: Component,
	...
}

const widgets: {| [widgetType: WidgetType]: Widget |} = {
	investigationsWidget: {
		name: 'My Investigations',
		Header: InvestigationsWidgetHeader,
		Body: InvestigationsWidget,
		settings: InvestigationsWidgetSettings,
	},
	buildTypeChangesWidget: {
		name: 'BuildType Changes Widget',
		// eslint-disable-next-line react/display-name
		Header: () => <span>No header</span>,
		Body: BuildTypeChangesWidget,
		TopLevelComponent: TopLevelChangeDetailsPopup,
		settings: BuildTypeChangesWidgetSettings,
	},
}

export const getWidgetSettingsComponent = (
	type: WidgetType
): ?WidgetComponent => widgets[type]?.settings

export default widgets
