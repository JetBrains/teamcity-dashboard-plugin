// @flow strict
import React from 'react'
import Section from './Section/Section'
import { H1 } from '@jetbrains/ring-ui/components/heading/heading'
import styles from './WidgetSettings.css'

type Properties = {|
	title: string,
	description: string,
	children: React$Node,
|}

const WidgetSettings = ({ title, description, children }: Properties) => {
	return (
		<div className={styles.WidgetSettings}>
			<div className={styles.widgetSettingsHeader}>
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
