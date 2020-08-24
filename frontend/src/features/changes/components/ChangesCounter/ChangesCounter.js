// @flow strict
import React from 'react'
import { useChangesActualCountByLocator } from '../../changes.hooks'
import type { ChangesLocator } from '../../changes.locator'
import LongTextShortText from '../../../../components/LongTextShortText/LongTextShortText'

import styles from './ChangesCounter.css'

interface Properties {
	locator: ChangesLocator;
	compact?: ?boolean;
}

const ChangesCounter = ({ locator, compact }: Properties) => {
	const count = useChangesActualCountByLocator(locator)
	const readableCount = count > 100 ? '100+' : count.toString()
	// return (
	// 	<LongTextShortText
	// 		className={styles.text}
	// 		shortText={readableCount}
	// 		longText={`Changes: ${readableCount}`}
	// 	/>
	// )
	return compact === true ? (
		readableCount
	) : (
		<LongTextShortText
			className={styles.text}
			shortText={readableCount}
			longText={(`Changes: ${readableCount}`: React$Node)}
		/>
	)
}

export default ChangesCounter
