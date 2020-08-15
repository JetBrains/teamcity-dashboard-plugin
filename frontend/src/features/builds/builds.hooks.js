// @flow strict
import { useCallback, useMemo, useEffect } from 'react'
import type { Build, BuildId } from './builds.slice'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchBuildTypeBuilds,
	selectBuildById,
} from './builds.slice'
import type { BuildTypeId, BuildTypeInternalId } from '../../hooks/TC/schemata'
import type { BuildsLocator } from './builds.locator'
import {
	fetchBuildsByLocator,
	selectBuildsIdsByLocator,
} from './buildsIdsByLocator.slice'
import type { AsyncStatus } from '../../commontypes'
import type { BranchesLocator } from '../branches/branches.locator'
import TC from '@teamcity/react-api'
import { fetchChangesByLocator } from '../changes/changesIdsByLocator.slice'
import { useBuildTypeConstants } from '../buildTypes/buildTypesConstants.hooks'
import { subscribeOnAllBuildTypeEvents } from '../buildTypes/buildTypes.subscribers'
import noop from '../../utils/noop'
import useCurrentUserId from '../../hooks/TC/useCurrentUserId'

export const useBuildsIdsByLocator = (
	locator: BuildsLocator
): [BuildId[], AsyncStatus, ?string] => {
	const buildsIdsByLocator = useSelector((state) =>
		selectBuildsIdsByLocator(state, locator)
	)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchBuildsByLocator({ locator }))
	}, [dispatch, locator])

	return [
		buildsIdsByLocator.ids,
		buildsIdsByLocator.status,
		buildsIdsByLocator.error,
	]
}

export const useBuildTypeBuildsIds = (
	buildTypeId: BuildTypeId,
	branch: BranchesLocator
): [BuildId[], AsyncStatus, ?string] => {
	const locator = useMemo(
		() => ({
			buildTypeId,
			branch,
		}),
		[branch, buildTypeId]
	)
	return useBuildsIdsByLocator(locator)
}

export const useBuildTypeBuildsIdsWithSubscription = (
	buildTypeId: BuildTypeId,
	branch: BranchesLocator
): [BuildId[], AsyncStatus, ?string] => {
	const dispatch = useDispatch()
	const buildTypeConstants = useBuildTypeConstants(buildTypeId)

	useEffect(
		() =>
			buildTypeConstants
				? subscribeOnAllBuildTypeEvents(
						buildTypeConstants.internalId,
						() => {
							dispatch(
								fetchBuildsByLocator({
									locator: {
										buildTypeId,
										branch,
									},
									force: true,
								})
							)
						}
				  )
				: noop,
		[branch, buildTypeConstants, buildTypeId, dispatch]
	)

	return useBuildTypeBuildsIds(buildTypeId, branch)
}

export const useBuild = (buildId: BuildId): ?Build => {
	return useSelector((state) => selectBuildById(state, buildId))
}

export const useBuildIcon = (build: ?Build): string => {
	const currentUserId = useCurrentUserId()
	if (build === null || build === undefined) {
		return 'help'
	}

	const {status, state: buildState, wasCanceled, failedToStart, personal, userId} = build
	const isMine = userId === currentUserId

	const modifiers = []
	if (personal === true) {
		modifiers.push(isMine ? 'my' : 'personal')
	}

	if (wasCanceled && buildState !== 'running') {
		modifiers.push('canceled')
	} else if (failedToStart === true) {
		modifiers.push('failedToStart')
	} else if (buildState === 'queued') {
		modifiers.push(buildState)
	} else {
		modifiers.push(buildState === 'running' ? buildState : 'finished')
		const isGreen = status === undefined || status === 'SUCCESS'
		modifiers.push(isGreen ? 'green' : 'red')
	}

	return modifiers.join('_')
}
