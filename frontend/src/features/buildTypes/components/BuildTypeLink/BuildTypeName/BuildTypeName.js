// @flow strict
import React from 'react'
import type { BuildTypeId } from '../../../buildTypes.types'
import { useBuildType } from '../../../buildTypes.hooks'
import { Link } from '@jetbrains/ring-ui'

interface Properties {
	buildTypeId: BuildTypeId;
	href?: ?string;
	className?: string;
}

const BuildTypeName = ({ buildTypeId, className, href }: Properties) => {
	const buildType = useBuildType(buildTypeId)
	return (
		<Link href={buildType?.webUrl ?? href ?? '#'} className={className} active>
			{buildType?.name ?? 'Loading...'}
		</Link>
	)
}

export default BuildTypeName
