// @flow strict
import React from 'react'
import styles from './WidgetBody.css'

import classNames from 'classnames'

type Properties = {|
	options?: Array<React$Node>,
	children: React$Node,
	className?: ?string,
	optionsClassName?: ?string,
|}

const WidgetBody = React.memo<Properties>(
	({ options, children, className, optionsClassName }: Properties) => {
		return (
			<div className={classNames(styles.WidgetBody, className)}>
				{options !== null && options !== undefined && (
					<div
						className={classNames(styles.options, optionsClassName)}
					>
						{options}
					</div>
				)}
				<div className={styles.content}>{children}</div>
			</div>
		)
	}
)

WidgetBody.displayName = 'WidgetBody'

export default WidgetBody
