// @flow strict
import React, { memo } from 'react'
import styles from './styles.css'
import ProjectPath from '../../../../../components/ProjectPath/ProjectPath'
import BuildTypeInvestigationPanel from './BuildTypeInvestigationPanel'
import TestInvestigationPanel from './TestInvestigationPanel'
import ProblemInvestigationPanel from './ProblemInvestigationPanel'
import InvestigationAdditionalInfoDropdown from '../../InvestigationAdditionalInfoDropdown/InvestigationAdditionalInfoDropdown'
import type { Investigation } from '../../../investigations.types'

const areInvestigationsEqual = (
	investigation1: Investigation,
	investigation2: Investigation
) => JSON.stringify(investigation1) === JSON.stringify(investigation2)

interface Properties {
	investigation: Investigation;
	withPath: boolean;
}

const panels = {
	buildType: BuildTypeInvestigationPanel,
	test: TestInvestigationPanel,
	problem: ProblemInvestigationPanel,
}

const InvestigationsListItem = memo<Properties>(
	({ investigation, withPath }: Properties) => {
		const Panel = panels[investigation.target.type]
		return (
			<div>
				{withPath && (
					<div className={styles.projectPathContainer}>
						<ProjectPath projectId={investigation.projectId} />
					</div>
				)}
				{Panel ? (
					<div className={styles.listItem}>
						<div className={styles.mainContent}>
							<Panel
								// TODO: fix this
								// $FlowFixMe
								id={investigation.target.id}
								name={investigation.target.name}
								webUrl={investigation.target.webUrl}
							/>
						</div>
						<div className={styles.right}>
							<InvestigationAdditionalInfoDropdown
								investigationId={investigation.id}
							/>
						</div>
					</div>
				) : (
					<span>
						This investigation cannot be rendered, this is a bug
					</span>
				)}
			</div>
		)
	},
	(previousProperties: Properties, nextProperties: Properties) =>
		previousProperties.withPath === nextProperties.withPath &&
		areInvestigationsEqual(
			previousProperties.investigation,
			nextProperties.investigation
		)
)

InvestigationsListItem.displayName = 'InvestigationsListItem'

export default InvestigationsListItem
