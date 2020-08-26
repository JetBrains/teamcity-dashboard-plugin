// @flow strict
import type { WidgetConfigs } from './widgetConfigs.types'
import myRecentBuildsWidgetConfig from '../../widgets/MyRecentBuildsBuildsWidget/myRecentBuildsWidgetConfig'
import investigationsWidgetConfig from '../../widgets/InvestigationsWidget/investigationsWidgetConfig'
import buildTypeChangesWidgetConfig from '../../widgets/BuildTypeChangesWidget/buildTypeChangesWidgetConfig'

const widgetConfigs: WidgetConfigs = {
	investigationsWidget: investigationsWidgetConfig,
	buildTypeChangesWidget: buildTypeChangesWidgetConfig,
	myRecentBuildsWidget: myRecentBuildsWidgetConfig,
}

export default widgetConfigs
