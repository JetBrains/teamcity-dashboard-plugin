// @flow strict
import React from 'react'
import type { InvestigationId } from '../../investigations.types'
import { useSelector } from 'react-redux'
import {
	selectInvestigationTargetType,
} from '../../investigations.slice'
import BuildTypeInvestigationLink from '../InvestigationsList/BuildTypeInvestigationsLink/BuildTypeInvestigationLink'
import TestOrProblemInvestigationLink from '../InvestigationsList/TestOrProblemInvestigationLink/TestOrProblemInvestigationLink'
import LoaderInline from '@jetbrains/ring-ui/components/loader-inline/loader-inline'

type Properties = {|
	investigationId: InvestigationId,
	className?: string,
|}

const InvestigationLink = ({ investigationId, className }: Properties) => {
	const targetType = useSelector((state) =>
		selectInvestigationTargetType(state, investigationId)
	)

	switch (targetType) {
		case 'buildType':
			return (
				<BuildTypeInvestigationLink
					investigationId={investigationId}
					className={className}
				/>
			)
		case 'test':
			return (
				<TestOrProblemInvestigationLink
					investigationId={investigationId}
					className={className}
				/>
			)
		case 'problem':
			return (
				<TestOrProblemInvestigationLink
					investigationId={investigationId}
					className={className}
				/>
			)
		default:
			return <LoaderInline />
	}
}

export default InvestigationLink
