// @flow strict
import React from 'react'
import BuildTypeLink from '../../../../buildTypes/components/BuildTypeLink/BuildTypeLink'
import type { InvestigationId } from '../../../investigations.types'
import { useSelector } from 'react-redux'
import {
	selectInvestigationTargetId,
	selectInvestigationTargetWebUrl,
} from '../../../investigations.slice'

type Properties = {|
	investigationId: InvestigationId,
	className?: string,
|}

const BuildTypeInvestigationLink = ({
	investigationId,
	className,
}: Properties) => {
	const buildTypeId = useSelector((state) =>
		selectInvestigationTargetId(state, investigationId)
	)
	const href = useSelector((state) =>
		selectInvestigationTargetWebUrl(state, investigationId)
	)
	return buildTypeId !== null && buildTypeId !== undefined ? (
		<BuildTypeLink
			buildTypeId={buildTypeId}
			href={href ?? '#'}
			className={className}
			multiline
		/>
	) : (
		'Loader...'
	)
}

export default BuildTypeInvestigationLink
