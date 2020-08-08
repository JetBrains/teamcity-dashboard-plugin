// @flow strict
import React from 'react'
import Dialog from '@jetbrains/ring-ui/components/dialog/dialog'
import useWidgetIdWithOpenedSettings from '../../hooks/widgets/useWidgetIdWithOpenedSettings'
import WidgetSettingsWrapper from '../WidgetSettingsWrapper/WidgetSettingsWrapper'

const WidgetSettingsDialog = () => {
	const [widgetId, closeSettings] = useWidgetIdWithOpenedSettings()
	return (
		<Dialog
			show={widgetId !== undefined && widgetId !== null}
			trapFocus
			showCloseButton
			onCloseAttempt={closeSettings}
		>
			{widgetId !== null && widgetId !== undefined && (
				<WidgetSettingsWrapper widgetId={widgetId} />
			)}
		</Dialog>
	)
}

export default WidgetSettingsDialog
