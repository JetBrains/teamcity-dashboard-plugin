// @flow strict
import React from 'react'
import { H2 } from '@jetbrains/ring-ui/components/heading/heading'
import styles from './styles.css'

interface Properties {
	title: string;
	description: string;
	children: React$Node;
}

const Section = ({ title, description, children }: Properties) => {
	return (
		<div className={styles.Section}>
			<div className={styles.sectionHeader}>
				<H2>{title}</H2>
				<span className={styles.sectionDescription}>{description}</span>
			</div>
			<div className={styles.sectionContentlevf}>{children}</div>
		</div>
	)
}

export default Section
