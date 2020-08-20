// @flow strict
import React from 'react'
import WidgetEllipsisOptions from './WidgetEllipsisOptions/WidgetEllipsisOptions'
import styles from './WidgetHeaderOptions.css'

interface Properties {
	children: React$Node[];
}

const WidgetHeaderOptions = ({ children }: Properties) => {
	return (
		<div className={styles.WidgetHeaderOptions}>
			{children}
			<WidgetEllipsisOptions />
		</div>
	)
}

export default WidgetHeaderOptions
