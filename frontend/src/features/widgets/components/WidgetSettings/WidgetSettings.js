// @flow strict
import React from 'react'
import classnames from 'classnames'
import Section from './Section/Section'
import { H1 } from '@jetbrains/ring-ui/components/heading/heading'
import styles from './WidgetSettings.css'

type Properties = {|
	title: string,
	description: string,
	children: React$Node,
	headerClassName?: string,
|}

const WidgetSettings = ({
	title,
	description,
	children,
	headerClassName,
}: Properties) => {
	const headerClasses = classnames(
		styles.widgetSettingsHeader,
		headerClassName
	)

	return (
		<div className={styles.WidgetSettings}>
			<div className={headerClasses}>
				<H1>{title}</H1>
				<span className={styles.widgetSettingsDescription}>
					{description}
				</span>
			</div>
			<div className={styles.widgetSettingsContent}>{children}</div>
		</div>
	)
}

export { Section }

export default WidgetSettings
