// @flow strict
import React from 'react'
import type { BuildTypeId } from '../../../../store/slices/buildTypesSlice'
import BuildTypeStatus from '../../../../components/BuildTypeStatus/BuildTypeStatus'

interface Properties {
	id: BuildTypeId,
	name: string,
}

const BuildTypeInvestigationPanel = ({ id, name }: Properties) => {
	return (
		<div>
			<BuildTypeStatus
				buildTypeId={id}
			/>
			<span>{name}</span>
		</div>

	)
}

export default BuildTypeInvestigationPanel
