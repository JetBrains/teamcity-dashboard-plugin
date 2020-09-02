// @flow strict
import React, { memo, useMemo } from 'react'
import styles from './styles.css'
import InvestigationAdditionalInfoDropdown from '../../InvestigationAdditionalInfoDropdown/InvestigationAdditionalInfoDropdown'
import type { Investigation } from '../../../investigations.types'
import BuildTypeInvestigationLink from '../BuildTypeInvestigationsLink/BuildTypeInvestigationLink'
import TestOrProblemInvestigationLink from '../TestOrProblemInvestigationLink/TestOrProblemInvestigationLink'
import Divider from '../../../../../components/Divider/Divider'
import ProjectPath from '../../../../../components/ProjectPath/ProjectPath'
import LoaderInline from '@jetbrains/ring-ui/components/loader-inline/loader-inline'

type Properties = {|
	investigation: Investigation,
	withDivider: boolean,
	withPath: boolean,
|}

const InvestigationsListItem = memo<Properties>(
	({ investigation, withPath, withDivider }: Properties) => {
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
							className={styles.testOrProblemInvestigationLink}
							name={investigation.target.name}
							href={investigation.target.webUrl}
						/>
					)
				case 'problem':
					return (
						<TestOrProblemInvestigationLink
							type={'problem'}
							className={styles.testOrProblemInvestigationLink}
							name={investigation.target.name}
							href={investigation.target.webUrl}
						/>
					)
				default:
					return (
						<LoaderInline />
					)
			}
		}, [
			investigation.target.id,
			investigation.target.name,
			investigation.target.type,
			investigation.target.webUrl,
		])

		return (
			<li className={styles.InvestigationsListItem}>
				{withDivider && <Divider className={styles.divider} />}
				<div className={styles.contentWrapper}>
					{withPath && (
						<div className={styles.projectPathContainer}>
							<ProjectPath
								projectId={investigation.projectId}
								className={styles.projectPath}
								multiline
							/>
						</div>
					)}

					<div className={styles.investigationLinkContainer}>
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
			</li>
		)
	}
)

InvestigationsListItem.displayName = 'InvestigationsListItem'

export default InvestigationsListItem
