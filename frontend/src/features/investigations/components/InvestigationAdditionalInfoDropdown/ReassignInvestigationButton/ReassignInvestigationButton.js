// @flow strict
import React from 'react'
import Button from '@jetbrains/ring-ui/components/button/button'
import type {
	Investigation,
	InvestigationId,
} from '../../../investigations.types'
import {
	useInvestigation,
	useReassignInvestigation,
} from '../../../investigations.hooks'
import type {
	UseReassignInvestigationArgument,
} from '../../../investigations.hooks'

const getUseReassignInvestigationArgument = (
	investigation: Investigation,
	fixMode: boolean
): UseReassignInvestigationArgument => {
	switch (investigation.target.type) {
		case 'buildType':
			return {
				type: 'buildType',
				fixMode,
				buildTypeId: investigation.target.id,
				buildTypeName: investigation.target.name,
			}
		case 'problem':
			return {
				type: 'problem',
				fixMode,
				problemId: investigation.target.id,
				buildId: investigation.target.buildIds[0],
			}
		case 'test':
			return {
				type: 'test',
				fixMode,
				projectId: investigation.projectId,
				testId: investigation.target.id,
				buildIds: investigation.target.buildIds,
			}
		default:
			return {}
	}
}

interface Properties {
	investigationId: InvestigationId;
	fix: boolean;
}

const ReassignInvestigationButton = ({
	investigationId,
	fix,
	...restProperties
}: Properties) => {
	const investigation = useInvestigation(investigationId)

	const argument: UseReassignInvestigationArgument =
		investigation !== null && investigation !== undefined
			? getUseReassignInvestigationArgument(investigation, fix)
			: {}

	const reassignInvestigation: () => void = useReassignInvestigation(argument)
	return (
		<Button
			loader={investigation === undefined || investigation === null}
			onClick={reassignInvestigation}
			{...restProperties}
		>
			{fix ? 'Fix' : 'Re-assign'}
		</Button>
	)
}

export default ReassignInvestigationButton
