// @flow strict
import React from 'react'

import styles from './WidgetSettingsMainLayout.css'
import Button from '@jetbrains/ring-ui/components/button/button'
import {
	useCancelWidgetSettings,
	useSaveThisWidgetSettings,
} from '../../../widgetSettings.hooks'

interface Properties {
	children: React$Node;
}

const WidgetSettingsMainLayout = ({ children }: Properties) => {
	const saveSettings = useSaveThisWidgetSettings()
	const cancelSettings = useCancelWidgetSettings()

	return (
		<div className={styles.WidgetSettingsMainLayout}>
			<div className={styles.customWidgetSettings}>{children}</div>
			<div className={styles.buttons}>
				<Button primary onClick={saveSettings}>
					Save
				</Button>
				<Button className={styles.cancel} onClick={cancelSettings}>
					Cancel
				</Button>
			</div>
		</div>
	)
}

export default WidgetSettingsMainLayout
