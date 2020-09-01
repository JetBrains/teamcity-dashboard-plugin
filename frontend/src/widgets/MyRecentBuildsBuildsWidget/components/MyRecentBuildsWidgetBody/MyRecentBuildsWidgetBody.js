// @flow strict
import React from 'react'
import WidgetBody from '../../../../components/WidgetBody/WidgetBody'
import MyRecentBuildsList from '../MyRecentBuildsList/MyRecentBuildsList'

import styles from './MyRecentBuildsWidgetBody.css'

const MyRecentBuildsWidgetBody = () => {
	return (
		<WidgetBody
			className={styles.MyRecentBuildsWidgetBody}
			optionsClassName={styles.options}
		>
			<MyRecentBuildsList />
		</WidgetBody>
	)
}

export default MyRecentBuildsWidgetBody
