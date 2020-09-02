// @flow strict
import React from 'react'
import classnames from 'classnames'
import { useChangesActualCountByLocator } from '../../changes.hooks'
import type { ChangesLocator } from '../../changes.locator'
import LongTextShortText from '../../../../components/LongTextShortText/LongTextShortText'

import styles from './ChangesCounter.css'

type Properties = {|
	locator: ChangesLocator,
	compact?: ?boolean,
	className?: string,
|}

const ChangesCounter = ({ locator, compact, className }: Properties) => {
	const count = useChangesActualCountByLocator(locator)
	const readableCount = count > 100 ? '100+' : count.toString()

	return compact === true ? (
		<span className={className}>{readableCount}</span>
	) : (
		<LongTextShortText
			className={classnames(styles.text, className)}
			shortText={readableCount}
			longText={(`Changes: ${readableCount}`: React$Node)}
		/>
	)
}

export default ChangesCounter
