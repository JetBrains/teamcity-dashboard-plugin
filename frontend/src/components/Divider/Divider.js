// @flow strict
import React from 'react'
import classNames from 'classnames'

import styles from './Divider.css'

type Properties = {|
	className?: string,
|}

const Divider = React.memo<Properties>(({ className }: Properties) => {
	return <div className={classNames(styles.Divider, className)} />
})

Divider.displayName = 'Divider'

export default Divider
