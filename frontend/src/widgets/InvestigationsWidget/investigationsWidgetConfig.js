// @flow strict
import InvestigationsWidgetHeader from './components/InvestigationsWidgetHeader/InvestigationsWidgetHeader'
import InvestigationsWidgetBody from './components/InvestigationsWidgetBody/InvestigationsWidgetBody'
import InvestigationsWidgetSettings from './components/InvestigationsWidgetSettings/InvestigationsWidgetSettings'
import type { WidgetConfig } from '../../features/widgets/widgetConfigs.types'

const investigationsWidgetConfig: WidgetConfig = {
	name: 'My Investigations',
	Header: InvestigationsWidgetHeader,
	Body: InvestigationsWidgetBody,
	settings: InvestigationsWidgetSettings,
	openSettingsFirst: false,
	defaultWidth: 5,
	minWidth: 3,
	minHeight: 5,
}

export default investigationsWidgetConfig
