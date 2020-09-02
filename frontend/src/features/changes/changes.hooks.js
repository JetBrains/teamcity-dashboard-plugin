// @flow strict
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectChangeById,
	selectChangeFilesCount,
	selectChangesByLocator,
} from './changes.slice'
import type { AsyncStatus } from '../../commontypes'
import type { ChangesLocator } from './changes.locator'
import {
	fetchChangesByLocator,
	selectChangesActualCountByLocator,
	selectChangesIdsByLocator,
} from './changesIdsByLocator.slice'
import type { BranchesLocator } from '../branches/branches.locator'

import { subscribeOnAllProjectEvents } from '../projects/projects.subscribers'
import { useBuild } from '../builds/builds.hooks'
import { subscribeOnAllBuildTypeEvents } from '../buildTypes/buildTypes.subscribers'
import { useBuildTypeConstants } from '../buildTypes/buildTypesConstants.hooks'
import noop from '../../utils/noop'
import useDependenciesDebugger from '../../hooks/debugging/useDependenciesDebugger'
import type { BuildId } from '../builds/builds.types'
import type { BuildTypeId } from '../buildTypes/buildTypes.types'
import {
	getBuildChangesLocator,
	getPendingBuildTypeChangesLocator,
} from './changes.locator'
import type { Change, ChangeId } from './changes.types'

export const usePendingBuildTypeChangesLocator = (
	buildTypeId: BuildTypeId,
	branch: BranchesLocator
) =>
	useMemo(() => getPendingBuildTypeChangesLocator(buildTypeId, branch), [
		branch,
		buildTypeId,
	])

export const useBuildChangesLocator = (buildId: BuildId) =>
	useMemo(() => getBuildChangesLocator(buildId), [buildId])

export const useChangesIdsByLocator = (
	locator: ChangesLocator
): [ChangeId[], AsyncStatus, ?string] => {
	const changesIdsByLocator = useSelector((state) =>
		selectChangesIdsByLocator(state, locator)
	)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchChangesByLocator({ locator }))
	}, [dispatch, locator])

	return [
		changesIdsByLocator.changesIds,
		changesIdsByLocator.status,
		changesIdsByLocator.error,
	]
}

export const useChangesActualCountByLocator = (
	locator: ChangesLocator
): number => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchChangesByLocator({ locator }))
	}, [dispatch, locator])
	return useSelector((state) =>
		selectChangesActualCountByLocator(state, locator)
	)
}

export const useBuildChangesIds = (
	buildId: BuildId
): [ChangeId[], AsyncStatus, ?string] => {
	const locator = useBuildChangesLocator(buildId)
	return useChangesIdsByLocator(locator)
}

export const useBuildChangesIdsWithSubscription = (
	buildId: BuildId
): [ChangeId[], AsyncStatus, ?string] => {
	const dispatch = useDispatch()
	const build = useBuild(buildId)
	const buildTypeConstants = useBuildTypeConstants(build?.buildTypeId)
	useEffect(
		() =>
			buildTypeConstants
				? subscribeOnAllBuildTypeEvents(
						buildTypeConstants.internalId,
						() => {
							dispatch(
								fetchChangesByLocator({
									locator: getBuildChangesLocator(buildId),
									force: true,
								})
							)
						},
						false
				  )
				: noop,
		[buildId, buildTypeConstants, dispatch]
	)
	useDependenciesDebugger({ buildId, buildTypeConstants, dispatch })

	return useBuildChangesIds(buildId)
}

export const usePendingBuildTypeChangesIds = (
	buildTypeId: BuildTypeId,
	branch: BranchesLocator
): [ChangeId[], AsyncStatus, ?string] => {
	const locator = usePendingBuildTypeChangesLocator(buildTypeId, branch)
	return useChangesIdsByLocator(locator)
}

export const usePendingBuildTypeChangesIdsWithSubscription = (
	buildTypeId: BuildTypeId,
	branch: BranchesLocator
): [ChangeId[], AsyncStatus, ?string] => {
	const dispatch = useDispatch()
	const buildTypesConstants = useBuildTypeConstants(buildTypeId)

	useEffect(
		() =>
			buildTypesConstants
				? subscribeOnAllProjectEvents(
						buildTypesConstants.internalProjectId,
						() => {
							dispatch(
								fetchChangesByLocator({
									locator: getPendingBuildTypeChangesLocator(
										buildTypeId,
										branch
									),
									force: true,
								})
							)
						}
				  )
				: noop,
		[branch, buildTypeId, buildTypesConstants, dispatch]
	)

	return usePendingBuildTypeChangesIds(buildTypeId, branch)
}

export const useChangesByLocator = (
	locator: ChangesLocator
): [Change[], AsyncStatus, ?string] => {
	const changesByLocator = useSelector((state) =>
		selectChangesByLocator(state, locator)
	)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchChangesByLocator({ locator }))
	}, [dispatch, locator])

	return [
		changesByLocator.changes,
		changesByLocator.status,
		changesByLocator.error,
	]
}

export const useChange = (changeId: ChangeId): ?Change => {
	return useSelector((state) => selectChangeById(state, changeId))
}

export const useChangeFilesCount = (changeId: ChangeId): number =>
	useSelector((state) => selectChangeFilesCount(state, changeId))
