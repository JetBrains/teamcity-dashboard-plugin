// @flow strict
import React from 'react'
import classnames from 'classnames'
import Loader from '@jetbrains/ring-ui/components/loader/loader'

import styles from './CenteredLoader.css'

type Properties = {|
	className?: string,
|}

const CenteredLoader = ({ className }: Properties) => {
	const classes = classnames(styles.CenteredLoader, className)

	return <Loader className={classes} />
}

export default CenteredLoader
