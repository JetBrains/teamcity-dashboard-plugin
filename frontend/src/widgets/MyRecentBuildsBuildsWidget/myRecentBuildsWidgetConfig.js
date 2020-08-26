// @flow strict
import React from 'react'
import MyRecentBuildsWidgetBody from './components/MyRecentBuildsWidgetBody/MyRecentBuildsWidgetBody'
import MyRecentBuildsHeader from './components/MyRecentBuildsHeader/MyRecentBuildsHeader'
import type { WidgetConfig } from '../../features/widgets/widgetConfigs.types'

const myRecentBuildsWidgetConfig: WidgetConfig = {
	name: 'My Recent Builds',
	Body: MyRecentBuildsWidgetBody,
	Header: MyRecentBuildsHeader,
	settings: () => (<span>no settings</span>),
}

export default myRecentBuildsWidgetConfig
