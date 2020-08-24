// @flow strict
import React, { memo, useMemo } from 'react'
import styles from './styles.css'
import ProjectPath from '../../../../../components/ProjectPath/ProjectPath'
import InvestigationAdditionalInfoDropdown from '../../InvestigationAdditionalInfoDropdown/InvestigationAdditionalInfoDropdown'
import type { Investigation } from '../../../investigations.types'
import BuildTypeInvestigationLink from '../BuildTypeInvestigationsLink/BuildTypeInvestigationLink'
import TestOrProblemInvestigationLink from '../TestOrProblemInvestigationLink/TestOrProblemInvestigationLink'

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
		const investigationLink = useMemo(() => {
			switch (investigation.target.type) {
				case 'buildType':
					return (
						<BuildTypeInvestigationLink
							// $FlowFixMe
							buildTypeId={investigation.target.id}
							href={investigation.target.webUrl}
						/>
					)
				case 'test':
					return (
						<TestOrProblemInvestigationLink
							type={'test'}
							name={investigation.target.name}
							href={investigation.target.webUrl}
						/>
					)
				case 'problem':
					return (
						<TestOrProblemInvestigationLink
							type={'problem'}
							name={investigation.target.name}
							href={investigation.target.webUrl}
						/>
					)
				default:
					return (
						<span>
							This investigation cannot be rendered, this is a bug
						</span>
					)
			}
		}, [
			investigation.target.id,
			investigation.target.name,
			investigation.target.type,
			investigation.target.webUrl,
		])

		return (
			<div>
				{withPath && (
					<div className={styles.projectPathContainer}>
						<ProjectPath projectId={investigation.projectId} />
					</div>
				)}

				<div className={styles.listItem}>
					<div className={styles.mainContent}>
						{investigationLink}
					</div>
					<div className={styles.right}>
						<InvestigationAdditionalInfoDropdown
							investigationId={investigation.id}
						/>
					</div>
				</div>
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
