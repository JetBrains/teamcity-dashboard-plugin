// @flow strict
import React from 'react'
import type { BuildId } from '../../builds.types'

import TC from '@teamcity/react-api'

const { AgentLink } = TC.Components

interface Properties {
	buildId: BuildId;
	className?: string;
}

const BuildAgentIcon = ({ buildId, className }: Properties) => {
	return <AgentLink buildId={buildId} className={className} />
}

export default BuildAgentIcon
