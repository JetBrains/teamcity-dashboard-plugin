// @flow strict
import React from 'react'
import type { InvestigationId } from '../../../store/slices/investigationsSlice'
import useInvestigation from '../../../hooks/investigations/useInvestigation'
import BuildTypeStatus from '../../BuildTypeStatus/BuildTypeStatus'
import ProjectPath from '../../ProjectPath/ProjectPath'
import styles from './InvestigationsListItem.css'

interface Properties {
	investigationId: InvestigationId;
	withPath: boolean;
}

const InvestigationsListItem = ({ investigationId, withPath }: Properties) => {
	const investigation = useInvestigation(investigationId)
	if (investigation === undefined || investigation === null) {
		return <span>Loading</span>
	}
	return (
		<div>
			{withPath && <ProjectPath projectId={investigation.projectId} />}
			{investigation.target.type === 'buildType' ? (
				<div className={styles.listItem}>
					<div className={styles.mainContent}>
						<BuildTypeStatus
							buildTypeId={investigation.target.id}
						/>
					</div>
					<div className={styles.options}>
						{/*<button>More</button>*/}
						{/*<Popup hidden={false}>*/}
						{/*	Asdsasd*/}
						{/*</Popup>*/}
						<span>Assigned by: {investigation.assignedBy}</span>
						<span>State: {investigation.state}</span>
						<span>Since: {investigation.date}</span>
					</div>
				</div>
			) : (
				<span>This is a test or a problem investigation</span>
			)}
		</div>
	)
}

export default InvestigationsListItem
