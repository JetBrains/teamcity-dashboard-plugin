// @flow strict
import React from 'react'
import useFilteredSortedInvestigations from '../../../hooks/investigations/useFilteredSortedInvestigations'
import InvestigationsList from './InvestigationsList'
import CenteredMessage from '../../../components/CenteredMessage/CenteredMessage'

interface Properties {
	widgetId: string;
}

const InvestigationsWidgetContent = ({ widgetId }: Properties) => {
	const [status, investigations] = useFilteredSortedInvestigations(widgetId)
	return status !== 'loading' && investigations.length === 0 ? (
		<CenteredMessage textIcon="ヽ(ヅ)ノ" text="No investigations" />
	) : (
		<InvestigationsList
			investigations={investigations}
			loading={status !== 'succeeded' && investigations.length === 0}
		/>
	)
}

export default InvestigationsWidgetContent
