// @flow strict
import React from 'react'
import type {
	Investigation,
} from '../../../store/slices/investigationsSlice'
import InvestigationsListItem from './InvestigationsListItem'

interface Properties {
	investigations: Investigation[];
	loading: boolean;
}

const InvestigationsList = ({ investigations, loading }: Properties) => {
	if (loading) {
		return <span>Loading</span>
	}
	return (
		<div>
			{investigations.map((investigation, index) => (
				<div key={investigation.id}>
					<InvestigationsListItem
						investigation={investigation}
						withPath={
							index === 0 ||
							investigation.projectId !==
							investigations[index - 1]
									.projectId
						}
					/>
				</div>
			))}
		</div>
	)
}

export default InvestigationsList
