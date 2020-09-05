// @flow strict
import React from 'react'
import InvestigationsListItem from './InvestigationsListItem/InvestigationsListItem'
import styles from './InvestigationsList.css'
import type { Investigation } from '../../investigations.types'
import Loader from '@jetbrains/ring-ui/components/loader/loader'
import { useFilteredSortedInvestigations } from '../../investigations.hooks'
import CenteredMessage from '../../../../components/CenteredMessage/CenteredMessage'

const withPath = (
	investigation: Investigation,
	index: number,
	investigations: Investigation[]
): boolean =>
	index === 0 ||
	investigation.projectId !== investigations[index - 1].projectId

const withDivider = (
	investigation: Investigation,
	index: number,
	investigations: Investigation[]
): boolean => index !== 0 && withPath(investigation, index, investigations)

const InvestigationsList = React.memo<{ ... }>(() => {
	const [status, investigations] = useFilteredSortedInvestigations()
	if (status === 'loading' && investigations.length === 0) {
		return <Loader className={styles.loader} />
	}
	return investigations.length !== 0 ? (
		<ol className={styles.InvestigationsList}>
			{investigations.map((investigation, index, investigations) => (
				<InvestigationsListItem
					key={investigation.id}
					investigationId={investigation.id}
					withPath={withPath(investigation, index, investigations)}
					withDivider={withDivider(
						investigation,
						index,
						investigations
					)}
				/>
			))}
		</ol>
	) : (
		<CenteredMessage textIcon="\(・‿・)/" text="No investigations" />
	)
})

InvestigationsList.displayName = 'InvestigationsList'

export default InvestigationsList
