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
	},
	myRecentBuildsWidget: {
		name: 'My Recent Builds',
		hasSettings: false,
		breakpoints: {
			small: 0,
			medium: 300,
			large: 550,
		},
	},
}

export default widgetsProperties
