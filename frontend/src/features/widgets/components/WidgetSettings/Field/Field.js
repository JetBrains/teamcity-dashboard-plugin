// @flow strict
import React from 'react'
import classnames from 'classnames'
import styles from './Field.css'

type Properties = {|
	label?: string,
	children: React$Node,
	className?: string,
|}

const Field = ({ children, label, className }: Properties) => {
	const classes = classnames(styles.Field, className)

	return (
		<div className={classes}>
			{label !== null && label !== undefined ? (
				<label>
					<span className={styles.labelText}>{label}</span>
					{children}
				</label>
			) : (
				children
			)}
		</div>
	)
}

export default Field
