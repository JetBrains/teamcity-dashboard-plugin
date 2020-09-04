// @flow strict
import React, { memo, useMemo } from 'react'
import styles from './styles.css'
import InvestigationAdditionalInfoDropdown from '../../InvestigationAdditionalInfoDropdown/InvestigationAdditionalInfoDropdown'
import type {
	InvestigationId,
} from '../../../investigations.types'
import Divider from '../../../../../components/Divider/Divider'
import ProjectPath from '../../../../../components/ProjectPath/ProjectPath'
import InvestigationLink from '../../InvestigationLink/InvestigationLink'
import { useSelector } from 'react-redux'
import { selectInvestigationProjectId } from '../../../investigations.slice'

type Properties = {|
	investigationId: InvestigationId,
	withDivider: boolean,
	withPath: boolean,
|}

const InvestigationsListItem = memo<Properties>(
	({ investigationId, withPath, withDivider }: Properties) => {
		const investigationProjectId = useSelector((state) =>
			selectInvestigationProjectId(state, investigationId)
		)

		const investigationLink = useMemo(
			() => <InvestigationLink investigationId={investigationId} />,
			[investigationId]
		)

		return (
			<li className={styles.InvestigationsListItem}>
				{withDivider && <Divider className={styles.divider} />}
				<div className={styles.contentWrapper}>
					{withPath && (
						<div className={styles.projectPathContainer}>
							{investigationProjectId !== null &&
							investigationProjectId !== undefined ? (
								<ProjectPath
									projectId={investigationProjectId}
									className={styles.projectPath}
									multiline
								/>
							) : (
								'...'
							)}
						</div>
					)}

					<div className={styles.investigationLinkContainer}>
						<div className={styles.mainContent}>
							{investigationLink}
						</div>
						<div className={styles.right}>
							<InvestigationAdditionalInfoDropdown
								investigationId={investigationId}
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
