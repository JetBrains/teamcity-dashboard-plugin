// @flow strict
import React from 'react'
import styles from './InvestigationsWidgetHeader.css'
import { useThisWidgetId } from '../../../../features/widgets/widgets.hooks'
import { useFilteredInvestigationsCount } from '../../../../features/investigations/investigations.hooks'

const InvestigationsWidgetHeader = () => {
	const widgetId = useThisWidgetId()
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
