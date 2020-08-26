// @flow strict
import type { WidgetConfig } from '../../features/widgets/widgetConfigs.types'
import BuildTypeChangesWidgetHeader from './components/BuildTypeChangesWidgetHeader/BuildTypeChangesWidgetHeader'
import BuildTypeChangesWidget from './BuildTypeChangesWidget'
import BuildTypeChangesWidgetSettings from './components/BuildTypeChangesWidgetSettings/BuildTypeChangesWidgetSettings'
import CollapseAllExpandAllButton from './components/CollapseAllExpandAllButton/CollapseAllExpandAllButton'

const buildTypeChangesWidgetConfig: WidgetConfig = {
	name: 'BuildType Changes Widget',
	// eslint-disable-next-line react/display-name
	Header: BuildTypeChangesWidgetHeader,
	Body: BuildTypeChangesWidget,
	settings: BuildTypeChangesWidgetSettings,
	// $FlowFixMe
	headerOptions: [CollapseAllExpandAllButton],
}

export default buildTypeChangesWidgetConfig
