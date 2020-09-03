// @flow strict
import React from 'react'
import classnames from 'classnames'
import type { BuildId } from '../../builds.types'
import TC from '@teamcity/react-api'
import MultilineBuildStatusLink from './MultilineBuildStatusLink/MultilineBuildStatusLink'
import styles from './BuildStatusLink.css'
import multilineStyles from './MultilineBuildStatusLink/MultilineBuildStatusLink.css'
import { useBuildStatusLink } from '../../builds.hooks'

const { BuildStatusLink: TCBuildStatusLink } = TC.Components

type Properties = {|
	className?: ?string,
	buildId: BuildId,
	multiline?: boolean,
|}

const BuildStatusLink = React.memo<Properties>(
	({ className, buildId, multiline = false }: Properties) => {
		const { statusType } = useBuildStatusLink(buildId)

		const classes = classnames(className, {
			// this is a hack that colors the TCBuildStatusLink component in not experimental ui
			// this should be removed once the dashboard moves to the experimental ui
			[multilineStyles[statusType]]: !multiline,
			[styles.regularLink]: !multiline,
		})

		return multiline ? (
			<MultilineBuildStatusLink buildId={buildId} className={classes} />
		) : (
			<TCBuildStatusLink className={classes} buildId={buildId} />
		)
	}
)

BuildStatusLink.displayName = 'BuildStatusLink (Wrapper)'

export default BuildStatusLink
