// @flow strict
import React from 'react'
import useFilteredInvestigationsCount from '../../../../hooks/investigations/useFilteredInvestigationsCount'
import styles from './styles.css'
import type { WidgetId } from '../../../../features/widgets/widgets.types'
import { useThisWidgetId } from '../../../../features/widgets/widgets.hooks'

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
