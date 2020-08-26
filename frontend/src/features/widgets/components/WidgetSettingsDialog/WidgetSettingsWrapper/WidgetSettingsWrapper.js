// @flow strict
import React from 'react'
import { useWidgetType } from '../../../widgets.hooks'
import ThisWidgetGeneralDataProvider from '../../ThisWidgetGeneralDataProvider/ThisWidgetGeneralDataProvider'
import WidgetSettingsMainLayout from '../WidgetSettingsMainLayout/WidgetSettingsMainLayout'
import CenteredMessage from '../../../../../components/CenteredMessage/CenteredMessage'
import { HIDDEN_SETTINGS_WIDGET_ID } from '../../../widgetSettings.slice'
import { getWidgetSettingsComponent } from '../../../widgetConfigs.utils'

const WidgetSettingsWrapper = () => {
	const type = useWidgetType(HIDDEN_SETTINGS_WIDGET_ID)
	const Settings = type ? getWidgetSettingsComponent(type) : undefined

	return (
		<ThisWidgetGeneralDataProvider
			thisWidgetId={HIDDEN_SETTINGS_WIDGET_ID}
			thisWidgetType={type}
		>
			{Settings ? (
				<WidgetSettingsMainLayout>
					<Settings />
				</WidgetSettingsMainLayout>
			) : (
				<CenteredMessage
					textIcon="¯\_(ツ)_/¯"
					text="This widget does not appear to have any settings"
				/>
			)}
		</ThisWidgetGeneralDataProvider>
	)
}

export default WidgetSettingsWrapper
