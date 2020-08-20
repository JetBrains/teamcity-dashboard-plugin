// @flow strict
import React from 'react'
import type { BuildTypeId } from '../../../buildTypes.types'
import { useBuildType } from '../../../buildTypes.hooks'

interface Properties {
	buildTypeId: BuildTypeId;
	className?: string;
}

const BuildTypeName = ({ buildTypeId, className }: Properties) => {
	const buildType = useBuildType(buildTypeId)
	return <span className={className}>{buildType?.name ?? 'Loading...'}</span>
}

export default BuildTypeName
