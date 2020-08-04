// @flow strict
import React from 'react'
import useFilteredSortedInvestigations from '../../../hooks/investigations/useFilteredSortedInvestigations'
import InvestigationsList from './InvestigationsList'

interface Properties {
	widgetId: string;
}

const InvestigationsWidgetContent = ({ widgetId }: Properties) => {
	const [status, investigations] = useFilteredSortedInvestigations(widgetId)
	return (
		<InvestigationsList
			investigations={investigations}
			loading={status !== 'succeeded' && investigations.length === 0}
		/>
	)
}

export default InvestigationsWidgetContent
