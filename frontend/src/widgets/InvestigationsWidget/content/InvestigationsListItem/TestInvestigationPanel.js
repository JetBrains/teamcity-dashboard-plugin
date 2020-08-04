// @flow strict
import React from 'react'
import styles from './styles.css'

interface Properties {
	id: string,
	name: string,
}

const TestInvestigationPanel = ({ name }: Properties) => {
	return (
		<div>
			<span className={styles.TestRedText}>Test:</span>
			<span className={styles.TestName}>{name}</span>
		</div>
	)
}

export default TestInvestigationPanel
