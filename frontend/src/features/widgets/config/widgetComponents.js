// @flow strict

import type { AllWidgetsComponents } from './widgetComponents.types'
import InvestigationsWidgetHeader
	from '../../../widgets/InvestigationsWidget/components/InvestigationsWidgetHeader/InvestigationsWidgetHeader'
import InvestigationsWidgetBody
	from '../../../widgets/InvestigationsWidget/components/InvestigationsWidgetBody/InvestigationsWidgetBody'
import InvestigationsWidgetSettings
	from '../../../widgets/InvestigationsWidget/components/InvestigationsWidgetSettings/InvestigationsWidgetSettings'
import BuildTypeChangesWidgetHeader
	from '../../../widgets/BuildTypeChangesWidget/components/BuildTypeChangesWidgetHeader/BuildTypeChangesWidgetHeader'
import BuildTypeChangesWidget from '../../../widgets/BuildTypeChangesWidget/BuildTypeChangesWidget'
import BuildTypeChangesWidgetSettings
	from '../../../widgets/BuildTypeChangesWidget/components/BuildTypeChangesWidgetSettings/BuildTypeChangesWidgetSettings'
import MyRecentBuildsWidgetBody
	from '../../../widgets/MyRecentBuildsBuildsWidget/components/MyRecentBuildsWidgetBody/MyRecentBuildsWidgetBody'
import MyRecentBuildsHeader
	from '../../../widgets/MyRecentBuildsBuildsWidget/components/MyRecentBuildsHeader/MyRecentBuildsHeader'
import CollapseAllExpandAllButton
	from '../../../widgets/BuildTypeChangesWidget/components/CollapseAllExpandAllButton/CollapseAllExpandAllButton'

const widgetComponents: AllWidgetsComponents = {
	investigationsWidget: {
		Header: InvestigationsWidgetHeader,
		Body: InvestigationsWidgetBody,
		Settings: InvestigationsWidgetSettings,
	},
	buildTypeChangesWidget: {
		Header: BuildTypeChangesWidgetHeader,
		Body: BuildTypeChangesWidget,
		Settings: BuildTypeChangesWidgetSettings,
		// $FlowFixMe
		headerOptions: [CollapseAllExpandAllButton],
	},
	myRecentBuildsWidget: {
		Body: MyRecentBuildsWidgetBody,
		Header: MyRecentBuildsHeader,
	}
}

export default widgetComponents
