// @flow strict
import React, { useMemo } from 'react'
import WidgetBody from '../../../../components/WidgetBody/WidgetBody'
import styles from './InvestigationsWidgetBody.css'
import InvestigationsList from '../../../../features/investigations/components/InvestigationsList/InvestigationsList'

const InvestigationsWidgetBody = () => {
	const content = useMemo(() => <InvestigationsList />, [])

	return (
		<WidgetBody optionsClassName={styles.options} className={styles.body}>
			{content}
		</WidgetBody>
	)
}

export default InvestigationsWidgetBody
