// @flow strict
import { useCallback, useEffect, useMemo } from 'react'
import {
	fetchInvestigations,
	selectFilteredInvestigationsCount,
	selectFilteredSortedInvestigations,
	selectInvestigationById,
	selectInvestigationsStatus,
} from './investigations.slice'
import { useDispatch, useSelector } from 'react-redux'
import type { Investigation, InvestigationId } from './investigations.types'
import type { AsyncStatus } from '../../commontypes'
import type { UserId } from '../../api/user/schemata'

import TC from '@teamcity/react-api'
import { useCurrentUserId } from '../users/users.hooks'
import type { ProjectId } from '../projects/projects.types'
import type { BuildId } from '../builds/builds.types'
import type { BuildTypeId } from '../buildTypes/buildTypes.types'
import { useThisWidgetId } from '../widgets/widgets.hooks'
import useThrottle from '../../hooks/useThrottle'

export const useFilteredInvestigationsCount = (): number => {
	const id = useThisWidgetId()
	const selector = useMemo(() => selectFilteredInvestigationsCount(id), [id])

	return useSelector(selector)
}

export const useInvestigation = (
	investigationId: InvestigationId
): ?Investigation => {
	return useSelector((state) =>
		selectInvestigationById(state, investigationId)
	)
}

export const useInvestigationsCounterOnUpdate: (
	UserId,
	onUpdate: () => void
) => void = TC.hooks.useInvestigationsCounterOnUpdate

export const useInvestigationsSubscription = (userId: UserId) => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchInvestigations({ userId }))
	}, [dispatch, userId])
	const onCounterUpdate = useCallback(() => {
		dispatch(fetchInvestigations({ userId, force: true }))
	}, [dispatch, userId])
	const throttledOnCounterUpdate = useThrottle(onCounterUpdate)
	useInvestigationsCounterOnUpdate(userId, throttledOnCounterUpdate)
}

export const useFilteredSortedInvestigations = (): [
	AsyncStatus,
	Investigation[]
] => {
	const widgetId = useThisWidgetId()
	const userId = useCurrentUserId()
	useInvestigationsSubscription(userId)
	const status = useSelector(selectInvestigationsStatus)
	const selector = useMemo(
		() => selectFilteredSortedInvestigations(widgetId),
		[widgetId]
	)
	const investigations = useSelector(selector)
	return [status, investigations]
}

export type UseReassignInvestigationArgument =
	| {|
			type: 'buildType',
			fixMode: boolean,
			buildTypeId: BuildTypeId,
			buildTypeName: string,
	  |}
	| {|
			type: 'problem',
			fixMode: boolean,
			problemId: string,
			buildId: BuildId,
	  |}
	| {|
			type: 'test',
			fixMode: boolean,
			projectId: ProjectId,
			testId: string,
			buildIds: BuildId[],
	  |}
	| {||}

export const useReassignInvestigation: (
	data: UseReassignInvestigationArgument
) => () => void = TC.hooks.useReassignInvestigation
