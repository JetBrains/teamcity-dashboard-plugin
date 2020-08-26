// @flow strict
import React from 'react'
import styles from './SimpleTextWidgetHeader.css'

interface Properties {
	children: React$Node | string;
}

const SimpleTextWidgetHeader = ({ children }: Properties) => {
	return (
		<div className={styles.SimpleTextWidgetHeader}>
			<span className={styles.text}>{children}</span>
		</div>
	)
}

export default SimpleTextWidgetHeader
