// @flow strict
import React from 'react'
import type { InvestigationId } from '../../../../store/slices/investigationsSlice'
import { useSelector } from 'react-redux'
import {
	selectInvestigationAssignedBy,
	selectInvestigationAssignmentDate,
	selectInvestigationState,
} from '../../../../store/slices/investigationsSlice'
import getUserDisplayName from '../../../../api/user/getUserDisplayName'
import FormattedDate from '../../../../components/FormattedDate/FormattedDate'
import type { User } from '../../../../api/user/schemata'
import ReassignInvestigationButton from '../ReassignInvestigationButton/ReassignInvestigationButton'

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
		<div>
			<div>State: {state}</div>
			<div>
				Assigned by: {user ? getUserDisplayName(user) : 'Loading...'}
			</div>
			<div>at {date ? <FormattedDate date={date} /> : 'Loading...'}</div>
			<ReassignInvestigationButton
				investigationId={investigationId}
				fix={false}
			/>
			{state !== 'FIXED' && (
				<ReassignInvestigationButton
					investigationId={investigationId}
					fix
				/>
			)}
		</div>
	)
}

export default InvestigationAdditionalInfo
