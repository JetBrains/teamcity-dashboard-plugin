// @flow strict

import type { AllWidgetsProperties } from './widgetProperties.types'

const widgetsProperties: AllWidgetsProperties = {
	investigationsWidget: {
		name: 'My Investigations',
		openSettingsFirst: false,
		defaultWidth: 3,
		minWidth: 3,
	},
	buildTypeChangesWidget: {
		name: 'BuildType Changes Widget',
		breakpoints: {
			medium: 420,
			large: 600,
		}
	},
	myRecentBuildsWidget: {
		name: 'My Recent Builds',
		hasSettings: false,
		breakpoints: {
			medium: 200,
			large: 550,
		},
	},
}

export default widgetsProperties
