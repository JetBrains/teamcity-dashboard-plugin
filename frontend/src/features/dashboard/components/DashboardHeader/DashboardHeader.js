// @flow strict
import React from 'react'
import { H1 } from '@jetbrains/ring-ui'
import AddWidgetButton from './AddWidgetButton/AddWidgetButton'

import styles from './DashboardHeader.css'

const DashboardHeader = () => {
	return (
		<div className={styles.DashboardHeader}>
			<H1>Dashboard</H1>
			<AddWidgetButton />
		</div>
	)
}

export default DashboardHeader
