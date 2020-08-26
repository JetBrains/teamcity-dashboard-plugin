// @flow strict
import React from 'react'

import styles from './Field.css'

interface Properties {
	children: React$Node;
}

const Field = ({ children }: Properties) => {
	return <div className={styles.Field}>{children}</div>
}

export default Field
