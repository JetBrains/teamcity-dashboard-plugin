// @flow strict
import React from 'react'
import useFilteredInvestigationsCount from '../../../../hooks/investigations/useFilteredInvestigationsCount'
import type { WidgetId } from '../../../../store/slices/widgetsSlice'
import styles from './styles.css'

interface Properties {
	widgetId: WidgetId;
}

const InvestigationsWidgetHeader = ({ widgetId }: Properties) => {
	const investigationsCount = useFilteredInvestigationsCount(widgetId)
	return (
		<div className={styles.InvestigationsWidgetHeaderContainer}>
			<span className={styles.InvestigationsWidgetText}>
				My investigations: {investigationsCount}
			</span>
		</div>
	)
}

export default InvestigationsWidgetHeader
