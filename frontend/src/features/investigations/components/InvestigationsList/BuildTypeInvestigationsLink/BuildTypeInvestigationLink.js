// @flow strict
import React from 'react'
import type { BuildTypeId } from '../../../../buildTypes/buildTypes.types'
import BuildTypeLink from '../../../../buildTypes/components/BuildTypeLink/BuildTypeLink'

interface Properties {
	buildTypeId: BuildTypeId;
	href?: ?string;
}

const BuildTypeInvestigationLink = ({ buildTypeId, href }: Properties) => {
	return <BuildTypeLink buildTypeId={buildTypeId} href={href} multiline />
}

export default BuildTypeInvestigationLink
