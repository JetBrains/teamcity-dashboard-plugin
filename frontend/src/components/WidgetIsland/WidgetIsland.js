// @flow strict
import React from 'react'
import styles from './WidgetIsland.css'

export type WidgetIslandProperties = {|
	title: React$Node,
	headerOptions: React$Node[],
	children: React$Node,
	mainRef?: ?React$Ref<*>,
|}

const WidgetIsland = React.memo<WidgetIslandProperties>(
	({ title, headerOptions, children, mainRef }: WidgetIslandProperties) => {
		return (
			<div className={styles.widgetIsland} ref={mainRef}>
				<div className={`${styles.header} draggable-handle`}>
					<div className={styles.headerTitle}>{title}</div>
					<div className={styles.headerOptions}>{headerOptions}</div>
				</div>
				<div className={styles.body}>{children}</div>
			</div>
		)
	}
)

WidgetIsland.displayName = 'WidgetIsland'

export default WidgetIsland
