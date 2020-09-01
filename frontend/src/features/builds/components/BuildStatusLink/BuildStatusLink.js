// @flow strict
import React from 'react'
import type { BuildId } from '../../builds.types'
import TC from '@teamcity/react-api'
import MultilineBuildStatusLink from './MultilineBuildStatusLink/MultilineBuildStatusLink'

const { BuildStatusLink: TCBuildStatusLink } = TC.Components

type Properties = {|
	className?: ?string,
	buildId: BuildId,
	multiline?: boolean,
|}

const BuildStatusLink = React.memo<Properties>(
	({ className, buildId, multiline = false }: Properties) => {
		return multiline ? (
			<MultilineBuildStatusLink
				buildId={buildId}
				className={className ?? ''}
			/>
		) : (
			<TCBuildStatusLink className={className ?? ''} buildId={buildId} />
		)
	}
)

BuildStatusLink.displayName = 'BuildStatusLink (Wrapper)'

export default BuildStatusLink
