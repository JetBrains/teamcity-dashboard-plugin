// @flow strict
import React from 'react'
import { useBuildChangesIdsWithSubscription } from '../../changes.hooks'
import ChangesList from '../ChangesList/ChangesList'
import type { BuildId } from '../../../builds/builds.types'

interface Properties {
	buildId: BuildId;
}

const BuildChangesList = React.memo<Properties>(({ buildId }: Properties) => {
	const [buildChangesIds] = useBuildChangesIdsWithSubscription(buildId)
	return <ChangesList changesIds={buildChangesIds} />
})

BuildChangesList.displayName = 'BuildChangesList'

export default BuildChangesList
