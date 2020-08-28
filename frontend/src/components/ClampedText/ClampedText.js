// @flow strict
import React, { useRef, useEffect } from 'react'
import classNames from 'classnames'
import clamp from 'clamp-js'

import styles from './ClampedText.css'

type Properties = {
	maxLines: number,
	children: React$Node,
	className?: ?string,
	...
}

const ClampedText = ({ maxLines, children, className }: Properties) => {
	const spanReference = useRef<?HTMLSpanElement>()

	useEffect(() => {
		if (spanReference.current) {
			clamp(spanReference.current, {clamp: maxLines})
		}
	}, [maxLines])

	return (
		<span
			ref={spanReference}
			className={classNames(styles.ClampedText, className)}
		>
			{children}
		</span>
	)
}

export default ClampedText
