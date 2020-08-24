// @flow strict
import React from 'react'
import { useSaveWidgetSettings } from '../../../widgetSettings.hooks'
import Button from '@jetbrains/ring-ui/components/button/button'

const SaveWidgetSettingsButton = () => {
	const saveSettings = useSaveWidgetSettings()
	return (
		<Button primary onClick={saveSettings}>Save</Button>
	)
}

export default SaveWidgetSettingsButton
