// @flow strict
import React from 'react'
import styles from './CenteredMessage.css'

interface Properties {
	textIcon?: string;
	text: string;
	extraNode?: ?React$Node;
}

const CenteredMessage = ({ textIcon, text, extraNode }: Properties) => {
	return (
		<div className={styles.CenteredMessage}>
			<div className={styles.messageContainer}>
				{textIcon !== null && textIcon !== undefined && (
					<span className={styles.icon}>{textIcon}</span>
				)}
				<span className={styles.text}>{text}</span>
				{extraNode !== null && extraNode !== undefined && (
					<div className={styles.extraNode}>{extraNode}</div>
				)}
			</div>
		</div>
	)
}

export default CenteredMessage
