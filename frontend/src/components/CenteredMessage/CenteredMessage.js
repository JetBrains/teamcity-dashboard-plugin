// @flow strict
import React from 'react'
import styles from './styles.css'

interface Properties {
	textIcon: string;
	text: string;
}

const CenteredMessage = ({ textIcon, text }: Properties) => {
	return (
		<div className={styles.CenteredMessage}>
			<div className={styles.messageContainer}>
				<span className={styles.icon}>{textIcon}</span>
				<span className={styles.text}>{text}</span>
			</div>
		</div>
	)
}

export default CenteredMessage
