// @flow strict
import React from 'react'
import CenteredMessage from '../../../../components/CenteredMessage/CenteredMessage'
import Button from '@jetbrains/ring-ui/components/button/button'
import { useOpenThisWidgetSettings } from '../../widgetSettings.hooks'

interface Properties {
	message: string;
	textIcon?: ?string;
}

const GoToSettingsMessage = ({ message, textIcon }: Properties) => {
	const openSettings = useOpenThisWidgetSettings()

	return (
		<CenteredMessage
			textIcon={textIcon ?? '?'}
			text={message}
			extraNode={<Button onClick={openSettings}>Open settings</Button>}
		/>
	)
}

export default GoToSettingsMessage
