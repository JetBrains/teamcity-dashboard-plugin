// @flow strict
import React, { memo } from 'react'
import type {
	Investigation,
} from '../../../store/slices/investigationsSlice'
import ProjectPath from '../../ProjectPath/ProjectPath'
import styles from './styles.css'
import InvestigationInfoDropdown from './InvestigationInfoDropdown'
import BuildTypeStatus from '../../BuildTypeStatus/BuildTypeStatus'


const areInvestigationsEqual = (
	investigation1: Investigation,
	investigation2: Investigation
) => JSON.stringify(investigation1) === JSON.stringify(investigation2)

interface Properties {
	investigation: Investigation;
	withPath: boolean;
}

const InvestigationsListItem = memo<Properties>(
	({ investigation, withPath }: Properties) => {
		return (
			<div>
				{withPath && (
					<ProjectPath projectId={investigation.projectId} />
				)}
				{investigation.target.type === 'buildType' ? (
					<div className={styles.listItem}>
						<div className={styles.mainContent}>
							<BuildTypeStatus
								buildTypeId={investigation.target.id}
							/>
						</div>
						<div className={styles.right}>
							<InvestigationInfoDropdown
								state={investigation.state}
								assignedBy={investigation.assignedBy}
								date={new Date(investigation.date)}
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
