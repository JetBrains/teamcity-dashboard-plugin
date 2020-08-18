// @flow strict
import React from 'react'
import styles from './WidgetBody.css'

interface Properties {
	options: Array<React$Node>;
	children: React$Node;
	className?: string;
}

const WidgetBody = ({ options, children, className }: Properties) => {
	return (
		<div className={`${styles.WidgetBody} ${className ?? ''}`}>
			<div className={styles.options}>
				{options}
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	)
}

export default WidgetBody
