// @flow strict
import React from 'react'
import WidgetBody from '../../../../components/WidgetBody/WidgetBody'
import MyRecentBuildsList from '../MyRecentBuildsList/MyRecentBuildsList'

const MyRecentBuildsWidgetBody = () => {
	return (
		<WidgetBody options={[]}>
			<MyRecentBuildsList />
		</WidgetBody>
	)
}

export default MyRecentBuildsWidgetBody
