// @flow strict
import React from 'react'
import classNames from 'classnames'

import styles from './Divider.css'

interface Properties {
	className?: string
}

const Divider = ({ className }: Properties) => {
	return (
		<div className={classNames(styles.Divider, className)}/>
	)
}

export default Divider
