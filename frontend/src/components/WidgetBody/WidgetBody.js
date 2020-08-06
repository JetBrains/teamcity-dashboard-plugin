// @flow strict
import React from 'react'
import styles from './WidgetBody.css'

interface Properties {
	options: Array<React$Node>;
	children: React$Node;
}

const WidgetBody = ({ options, children }: Properties) => {
	return (
		<div className={styles.WidgetBody}>
			<div className={styles.options}>
				{options}
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	)
}

export default WidgetBody
