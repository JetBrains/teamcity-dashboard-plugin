// @flow strict
import React from 'react'
import { useSelector } from 'react-redux'
import getUserDisplayName from '../../../../../api/user/getUserDisplayName'
import FormattedDate from '../../../../../components/FormattedDate/FormattedDate'
import type { User } from '../../../../../api/user/schemata'
import ReassignInvestigationButton from '../ReassignInvestigationButton/ReassignInvestigationButton'
import styles from './InvestigationAdditionalInfo.css'
import type { InvestigationId } from '../../../investigations.types'
import {
	selectInvestigationAssignedBy,
	selectInvestigationAssignmentDate,
	selectInvestigationState,
} from '../../../investigations.slice'

interface Properties {
	investigationId: InvestigationId;
}

const InvestigationAdditionalInfo = ({ investigationId }: Properties) => {
	const user: ?User = useSelector((state) =>
		selectInvestigationAssignedBy(state, investigationId)
	)
	const date: ?Date = useSelector((state) =>
		selectInvestigationAssignmentDate(state, investigationId)
	)
	const state: ?string = useSelector((state) =>
		selectInvestigationState(state, investigationId)
	)
	return (
		<div className={styles.InvestigationAdditionalInfo}>
			<div className={styles.user}>
				{user ? getUserDisplayName(user) : 'Loading...'}
			</div>
			<div className={styles.time}>
				at {date ? <FormattedDate date={date} /> : 'Loading...'}
			</div>
			<div className={styles.buttonsContainer}>
				{state !== 'FIXED' && (
					<ReassignInvestigationButton
						className={styles.fix}
						investigationId={investigationId}
						fix
					/>
				)}
				<ReassignInvestigationButton
					className={styles.reassign}
					investigationId={investigationId}
					fix={false}
				/>
			</div>
		</div>
	)
}

export default InvestigationAdditionalInfo
