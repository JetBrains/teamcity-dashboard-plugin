// @flow strict
import { useEffect, useMemo } from 'react'
import type { BuildId } from '../builds/builds.slice'
import { useDispatch, useSelector } from 'react-redux'
import { selectChangeById, selectChangesByLocator } from './changes.slice'
import type { Change, ChangeId } from './changes.slice'
import type { AsyncStatus } from '../../commontypes'
import type { BuildTypeId } from '../../hooks/TC/schemata'
import type { ChangesLocator } from './changes.locator'
import {
	fetchChangesByLocator,
	selectChangesIdsByLocator,
} from './changesIdsByLocator.slice'
import type { BranchesLocator } from '../branches/branches.locator'
import useBuildType from '../../hooks/TC/useBuildType'
import { useProject } from '../projects/projects.hooks'

import TC from '@teamcity/react-api'
import { subscribeOnAllProjectEvents } from '../projects/projects.subscribers'
import { useBuild } from '../builds/builds.hooks'
import { subscribeOnAllBuildTypeEvents } from '../buildTypes/buildTypes.subscribers'
import { useBuildTypeConstants } from '../buildTypes/buildTypesConstants.hooks'
import noop from '../../utils/noop'
import useDependenciesDebugger from '../../hooks/debugging/useDependenciesDebugger'

export const useChangesIdsByLocator = (
	locator: ChangesLocator,
	fetch?: boolean = true
): [ChangeId[], AsyncStatus, ?string] => {
	console.log('useChangesIdsByLocator', locator)
	const changesIdsByLocator = useSelector((state) =>
		selectChangesIdsByLocator(state, locator)
	)
	const dispatch = useDispatch()

	useEffect(() => {
		if (fetch) {
			dispatch(fetchChangesByLocator({ locator }))
		}
	}, [dispatch, fetch, locator])

	return [
		changesIdsByLocator.changesIds,
		changesIdsByLocator.status,
		changesIdsByLocator.error,
	]
}

export const useBuildChangesIds = (
	buildId: BuildId,
	fetch?: boolean
): [ChangeId[], AsyncStatus, ?string] => {
	const locator = useMemo(
		() => ({
			buildId,
		}),
		[buildId]
	)
	return useChangesIdsByLocator(locator, fetch)
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
						(data, topic) => {
							console.log(
								'handler fired for',
								buildId,
								'with',
								data,
								topic
							)
							dispatch(
								fetchChangesByLocator({
									locator: {
										buildId,
									},
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
	const locator = useMemo(
		() => ({
			buildTypeId,
			branch,
			pending: true,
		}),
		[branch, buildTypeId]
	)
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
									locator: {
										buildTypeId,
										branch,
										pending: true,
									},
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

export const useBuildChanges = (
	buildId: BuildId
): [Change[], AsyncStatus, ?string] => {
	const locator = useMemo(
		() => ({
			buildId,
		}),
		[buildId]
	)

	return useChangesByLocator(locator)
}

export const usePendingBuildTypeChanges = (
	buildTypeId: BuildTypeId,
	branch: BranchesLocator
): [Change[], AsyncStatus, ?string] => {
	const locator = useMemo(
		() => ({
			buildTypeId,
			branch,
			pending: true,
		}),
		[branch, buildTypeId]
	)
	return useChangesByLocator(locator)
}

export const useChange = (changeId: ChangeId): ?Change => {
	return useSelector((state) => selectChangeById(state, changeId))
}
