// @flow strict
import React from 'react'
import type { BuildId } from '../../builds.types'

import TC from '@teamcity/react-api'

const { AgentLink } = TC.Components

interface Properties {
	buildId: BuildId;
}

const BuildAgentIcon = ({ buildId }: Properties) => {
	return <AgentLink buildId={buildId} />
}

export default BuildAgentIcon
