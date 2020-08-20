// @flow strict
import React from 'react'
import classNames from 'classnames'

import styles from './LongTextShortText.css'

interface Properties {
	shortText: string;
	longText: string;
	className?: ?string;
	shortTextClassName?: ?string;
	longTextClassName?: ?string;
}

const LongTextShortText = React.memo<Properties>(
	({
		shortText,
		longText,
		className,
		shortTextClassName,
		longTextClassName,
	}: Properties) => {
		return (
			<span className={classNames(styles.LongTextShortText, className)}>
				<span
					aria-hidden={true}
					title={longText}
					className={classNames(styles.short, shortTextClassName)}
				>
					{shortText}
				</span>
				<span className={classNames(styles.long, longTextClassName)}>
					{longText}
				</span>
			</span>
		)
	}
)

LongTextShortText.displayName = 'LongTextShortText'

export default LongTextShortText
