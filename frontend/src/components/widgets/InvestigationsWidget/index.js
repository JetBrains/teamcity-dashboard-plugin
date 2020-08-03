// @flow strict
import React from 'react'
import InvestigationsList from './InvestigationsList'
import InvestigationsSortingSelector from './InvestigationsSortingSelector'
import ShowFixedInvestigationsSelector from './ShowFixedInvestigationsSelector'
import useFilteredSortedInvestigations from '../../../hooks/investigations/useFilteredSortedInvestigations'

interface Properties {
	widgetId: string;
}

const InvestigationsWidget = ({ widgetId }: Properties) => {
	const [status, investigations] = useFilteredSortedInvestigations(widgetId)
	return (
		<React.Fragment>
			<div>
				<InvestigationsSortingSelector widgetId={widgetId} />
				<ShowFixedInvestigationsSelector widgetId={widgetId} />
			</div>
			<InvestigationsList
				investigations={investigations}
				loading={status !== 'succeeded' && investigations.length === 0}
			/>
		</React.Fragment>

)
}

export default InvestigationsWidget
