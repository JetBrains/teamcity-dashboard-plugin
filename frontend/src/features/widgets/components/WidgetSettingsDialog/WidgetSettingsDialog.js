// @flow strict
import React from 'react'
import Dialog from '@jetbrains/ring-ui/components/dialog/dialog'
import WidgetSettingsWrapper from './WidgetSettingsWrapper/WidgetSettingsWrapper'
import {
	useAreWidgetSettingsOpened,
	useCancelWidgetSettings,
} from '../../widgetSettings.hooks'

const WidgetSettingsDialog = () => {
	const areSettingsOpened = useAreWidgetSettingsOpened()
	const cancelSettings = useCancelWidgetSettings()

	return (
		<Dialog
			show={areSettingsOpened}
			trapFocus
			showCloseButton
			onCloseAttempt={cancelSettings}
		>
			{areSettingsOpened && <WidgetSettingsWrapper />}
		</Dialog>
	)
}

export default WidgetSettingsDialog
