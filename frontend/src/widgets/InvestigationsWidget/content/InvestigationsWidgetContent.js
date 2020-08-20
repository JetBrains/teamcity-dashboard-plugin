// @flow strict
import React from 'react'
import InvestigationsList from '../../../features/investigations/components/InvestigationsList/InvestigationsList'
import CenteredMessage from '../../../components/CenteredMessage/CenteredMessage'
import { useFilteredSortedInvestigations } from '../../../features/investigations/investigations.hooks'

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
