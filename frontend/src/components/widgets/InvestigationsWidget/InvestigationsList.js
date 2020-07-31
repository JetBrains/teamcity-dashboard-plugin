// @flow strict
import React from 'react'
import type { InvestigationsSortingOption } from '../../../hooks/investigations/useInvestigationsSortedBy'
import useInvestigationsSortedBy from '../../../hooks/investigations/useInvestigationsSortedBy'
import type { Investigation } from '../../../store/slices/investigationsSlice'
import InvestigationsListItem from './InvestigationsListItem'

interface Properties {
	sortBy: InvestigationsSortingOption;
}

const InvestigationsList = ({ sortBy }: Properties) => {
	const [fetchingStatus, investigations] = useInvestigationsSortedBy(sortBy)
	if (fetchingStatus !== 'succeeded') {
		return <span>Loading</span>
	}
	return (
		<div>
			{investigations.map((investigation: Investigation, index) => (
				<div key={investigation.id}>
					<InvestigationsListItem
						investigationId={investigation.id}
						withPath={
							index === 0 ||
							investigation.projectId !==
								investigations[index - 1].projectId
						}
					/>
				</div>
			))}
		</div>
	)
}

export default InvestigationsList
