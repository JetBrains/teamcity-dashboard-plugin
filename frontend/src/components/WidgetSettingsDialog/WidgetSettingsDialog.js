// @flow strict
import React from 'react'
import Dialog from '@jetbrains/ring-ui/components/dialog/dialog'
import WidgetSettingsWrapper from '../WidgetSettingsWrapper/WidgetSettingsWrapper'
import {useWidgetIdWithOpenedSettings} from '../../features/widgets/widgets.hooks'

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
