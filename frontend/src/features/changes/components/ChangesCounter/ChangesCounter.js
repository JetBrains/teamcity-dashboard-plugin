// @flow strict
import React from 'react'
import { useChangesActualCountByLocator } from '../../changes.hooks'
import type { ChangesLocator } from '../../changes.locator'
import LongTextShortText from '../../../../components/LongTextShortText/LongTextShortText'

import styles from './ChangesCounter.css'

interface Properties {
	locator: ChangesLocator;
}

const ChangesCounter = ({ locator }: Properties) => {
	const count = useChangesActualCountByLocator(locator)
	const readableCount = count > 100 ? '100+' : count.toString()
	// return <span>Changes: {count > 100 ? '100+' : count}</span>
	return <LongTextShortText className={styles.text} shortText={readableCount} longText={`Changes: ${readableCount}`} />
}

export default ChangesCounter
