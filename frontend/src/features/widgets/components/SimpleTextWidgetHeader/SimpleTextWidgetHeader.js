// @flow strict
import React from 'react'
import styles from './SimpleTextWidgetHeader.css'

type Properties = {|
	children: React$Node,
|}

const SimpleTextWidgetHeader = ({ children }: Properties) => {
	return (
		<div className={styles.SimpleTextWidgetHeader}>
			<span className={styles.text}>{children}</span>
		</div>
	)
}

export default SimpleTextWidgetHeader
