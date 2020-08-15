// @flow strict
import React, { useMemo } from 'react'
import type { BuildId } from '../../builds.slice'
import { useBuild, useBuildIcon } from '../../builds.hooks'

import TC from '@teamcity/react-api'
import { useBuildTypeIdOption } from '../../../../widgets/BuildTypeChangesWidget/options/hooks'
import { OkIcon } from '@jetbrains/ring-ui/components/icon'

const { BuildStatus, BuildStatusLink } = TC.Components

interface Properties {
	buildId: BuildId;
}

const getIcon = (build: ?Build) => {
	if (build === null || build === undefined) {
		return 'help'
	}

	const {
		status,
		state: buildState,
		canceledInfo,
		failedToStart,
		personal,
	} = build

	const modifiers = []
	// if (personal === true) {
	// 	modifiers.push(getIsMine(state, buildId) ? 'my' : 'personal')
	// }

	if (canceledInfo != null && buildState !== 'running') {
		modifiers.push('canceled')
	} else if (failedToStart === true) {
		modifiers.push('failedToStart')
	} else if (buildState === 'queued') {
		modifiers.push(buildState)
	} else {
		modifiers.push(buildState === 'running' ? buildState : 'finished')
		const isGreen = status == null || status === 'SUCCESS'
		modifiers.push(isGreen ? 'green' : 'red')
	}

	return modifiers.join('_')
}

const BuildStatusText = ({ buildId }: Properties) => {
	const buildTypeId = useBuildTypeIdOption()
	const build = useBuild(buildId)
	const icon = useBuildIcon(build)

	const style = useMemo(
		() => ({ color: build?.status === 'FAILURE' ? 'red' : 'green' }),
		[build?.status]
	)
	// return (
	// 	<span style={style}>
	// 		{build?.state !== 'queued' ? build?.statusText: 'Queued'}
	// 	</span>
	// )
	return (
		build && (
			<BuildStatusLink
				buildId={buildId}
				buildUrl="fakeUrl"
				statusText={build.statusText}
				statusType={build.status.toLocaleLowerCase()}
				isQueued={build.state === 'queued'}
				icon={icon}
				isExperimentalUI
			/>
		)
	)
	return (
		<BuildStatus
			buildTypeId={buildTypeId}
			buildId={buildId}
			state={build?.state}
		/>
	)
}

export default BuildStatusText
