// @flow strict
import React from 'react'
import BuildTypeStatus from '../../../../components/BuildTypeStatus/BuildTypeStatus'
import type { BuildTypeId } from '../../../../hooks/TC/schemata'

interface Properties {
	id: BuildTypeId;
	name: string;
	webUrl: string;
}

const BuildTypeInvestigationPanel = ({ id, name, webUrl }: Properties) => {
	return (
		<div>
			<BuildTypeStatus buildTypeId={id} />
			<a href={webUrl}>{name}</a>
		</div>
	)
}

export default BuildTypeInvestigationPanel
