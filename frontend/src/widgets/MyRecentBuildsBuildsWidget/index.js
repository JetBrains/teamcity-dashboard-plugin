// @flow strict
import React from 'react'
import type { WidgetConfig } from '../widgets'
import MyRecentBuildsWidgetBody from './components/MyRecentBuildsWidgetBody/MyRecentBuildsWidgetBody'
import MyRecentBuildsHeader from './components/MyRecentBuildsHeader/MyRecentBuildsHeader'

const myRecentBuildsWidgetConfig: WidgetConfig = {
	name: 'My Recent Builds',
	Body: MyRecentBuildsWidgetBody,
	Header: MyRecentBuildsHeader,
	settings: () => (<span>no settings</span>),
}

export default myRecentBuildsWidgetConfig
