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
}

export default investigationsWidgetConfig
