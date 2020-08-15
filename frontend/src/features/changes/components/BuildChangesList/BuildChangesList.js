// @flow strict
import React from 'react'
import type { BuildId } from '../../../builds/builds.slice'
import {
	useBuildChangesIds,
	useBuildChangesIdsWithSubscription,
} from '../../changes.hooks'
import ChangeView from '../ChangeView/ChangeView'
import ChangesList from '../ChangesList/ChangesList'

interface Properties {
	buildId: BuildId;
}

const BuildChangesList = React.memo<Properties>(({ buildId }: Properties) => {
	const [buildChangesIds] = useBuildChangesIdsWithSubscription(buildId)
	return <ChangesList changesIds={buildChangesIds} />
})

BuildChangesList.displayName = 'BuildChangesList'

export default BuildChangesList
