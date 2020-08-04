// @flow strict
import React, { memo, useMemo } from 'react'
import type { Investigation } from '../../../../store/slices/investigationsSlice'
import styles from './styles.css'
import InvestigationInfoDropdown from './InvestigationInfoDropdown'
import ProjectPath from '../../../../components/ProjectPath/ProjectPath'
import BuildTypeInvestigationPanel from './BuildTypeInvestigationPanel'
import TestInvestigationPanel from './TestInvestigationPanel'

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
	problem: undefined,
}

const InvestigationsListItem = memo<Properties>(
	({ investigation, withPath }: Properties) => {
		const date = useMemo(() => new Date(investigation.date), [
			investigation.date,
		])

		const Panel = panels[investigation.target.type]

		return (
			<div>
				{withPath && (
					<ProjectPath projectId={investigation.projectId} />
				)}
				{Panel ? (
					<div className={styles.listItem}>
						<div className={styles.mainContent}>
							<Panel
								id={investigation.target.id}
								name={investigation.target.name}
							/>
						</div>
						<div className={styles.right}>
							<InvestigationInfoDropdown
								state={investigation.state}
								assignedBy={investigation.assignedBy}
								date={date}
							/>
						</div>
					</div>
				) : (
					<span>This is a test or a problem investigation</span>
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
