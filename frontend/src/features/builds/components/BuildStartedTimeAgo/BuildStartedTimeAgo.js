// @flow strict
import React, { useMemo } from 'react'
import type { BuildId } from '../../builds.types'
import { useBuild } from '../../builds.hooks'
import TimeAgo from 'react-timeago'
import { parseTimestamp } from '../../../../utils/parseTimestamp'
import { useGetCurrentTime } from '../../../currentTime/currentTime.hooks'

interface Properties {
	buildId: BuildId;
}

const BuildStartedTimeAgo = ({ buildId }: Properties) => {
	const build = useBuild(buildId)
	const timestamp = build?.startDate

	const getTime = useGetCurrentTime()

	const date: ?Date = useMemo(
		() =>
			timestamp !== undefined && timestamp !== null
				? parseTimestamp(timestamp)
				: undefined,
		[timestamp]
	)

	// eslint-disable-next-line unicorn/no-null
	return date ? <TimeAgo date={date} live={false} now={getTime} /> : null
}

export default BuildStartedTimeAgo
