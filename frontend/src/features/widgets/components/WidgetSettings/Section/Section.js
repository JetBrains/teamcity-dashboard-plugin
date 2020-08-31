// @flow strict
import React from 'react'
import classnames from 'classnames'

import styles from './Section.css'

type Properties = {|
	title?: string,
	last?: boolean,
	children: React$Node,
|}

const Section = ({ title, children, last = false }: Properties) => {
	const classes = classnames(styles.Section, { [styles.last]: last })

	return (
		<div className={classes}>
			{title !== null && title !== undefined && (
				<h2 className={styles.heading}>{title}</h2>
			)}
			<div className={styles.content}>{children}</div>
		</div>
	)
}

export default Section
