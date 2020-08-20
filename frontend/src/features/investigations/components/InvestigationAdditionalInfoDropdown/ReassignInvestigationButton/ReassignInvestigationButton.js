// @flow strict
import React from 'react'
import TC from '@teamcity/react-api'
import Button from '@jetbrains/ring-ui/components/button/button'
import type { InvestigationId } from '../../../investigations.types'
import { useInvestigation } from '../../../investigations.hooks'

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
	const reassignInvestigation: () => void = TC.hooks.useReassignInvestigation(
		{
			type: investigation?.target?.type,
			fixMode: fix,
			// test investigation
			projectId: investigation?.projectId,
			testId: investigation?.target?.id,
			buildIds: investigation?.target?.buildIds,
			// problem investigation
			problemId: investigation?.target?.id,
			buildId: investigation?.target?.buildIds[0],
			// buildtype investigation
			buildTypeId: investigation?.target?.id,
			buildTypeName: investigation?.target?.name,
		}
	)
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
