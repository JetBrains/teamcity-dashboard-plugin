// @flow strict
import React from 'react'
import InvestigationsListItem from './InvestigationsListItem/InvestigationsListItem'
import type { Investigation } from '../../../store/slices/investigationsSlice'
import styles from './InvestigationsList.css'

interface Properties {
	investigations: Investigation[];
	loading: boolean;
}

const InvestigationsList = ({ investigations, loading }: Properties) => {
	if (loading) {
		return <span>Loading</span>
	}
	return (
		<div className={styles.InvestigationsList}>
			{investigations.map((investigation, index) => (
				<InvestigationsListItem
					key={investigation.id}
					investigation={investigation}
					withPath={
						index === 0 ||
						investigation.projectId !==
						investigations[index - 1].projectId
					}
				/>
			))}
		</div>
	)
}

export default InvestigationsList
