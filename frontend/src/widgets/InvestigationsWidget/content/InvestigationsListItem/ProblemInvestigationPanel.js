// @flow strict
import React from 'react'
import styles from './styles.css'

interface Properties {
	id: string;
	name: string;
	webUrl: string;
}

const ProblemInvestigationPanel = ({ name, webUrl }: Properties) => {
	return (
		<div>
			<span className={styles.TestRedText}>Problem:</span>
			<a className={styles.TestName} href={webUrl}>
				{name}
			</a>
		</div>
	)
}

export default ProblemInvestigationPanel
