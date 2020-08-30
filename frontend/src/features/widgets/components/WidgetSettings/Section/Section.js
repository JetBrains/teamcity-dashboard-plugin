// @flow strict
import React from 'react'
import styles from './Section.css'

type Properties = {|
	title?: string,
	description?: ?string,
	children: React$Node,
|}

const Section = ({ title, children }: Properties) => {
	return (
		<div className={styles.Section}>
			{title !== null && title !== undefined && (
				<h2 className={styles.heading}>{title}</h2>
			)}
			<div className={styles.content}>{children}</div>
		</div>
	)
}

export default Section
