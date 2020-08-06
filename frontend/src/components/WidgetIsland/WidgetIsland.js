// @flow strict
import React from 'react'
import styles from './WidgetIsland.css'

interface Properties {
	title: React$Node;
	headerOptions: React$Node[];
	// inBodyOptions: React$Node[];
	children: React$Node;
}

const WidgetIsland = ({
	title,
	headerOptions,
	children,
}: Properties) => {
	return (
		<div className={styles.widgetIsland}>
			<div className={`${styles.header} draggable-handle`}>
				<div className={styles.headerTitle}>{title}</div>
				<div className={styles.headerOptions}>{headerOptions}</div>
			</div>
			<div className={styles.body}>
				{/*<div className={styles.bodyOptions}>*/}
				{/*	<div className={styles.bodyWidgetSpecificOptions}>*/}
				{/*		{inBodyOptions}*/}
				{/*	</div>*/}
				{/*	/!*<div className={styles.bodyScrollToTopOption}>*!/*/}
				{/*	/!*	<button>^</button>*!/*/}
				{/*	/!*</div>*!/*/}
				{/*</div>*/}
				{/*<div className={styles.content}>{children}</div>*/}
				{children}
			</div>
		</div>
	)
}

export default WidgetIsland
