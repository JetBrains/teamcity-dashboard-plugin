// @flow strict
import type { WidgetId } from '../widgets/widgets.types'
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

export const useFilteredInvestigationsCount = (widgetId: WidgetId): number => {
	const selector = useMemo(
		() => selectFilteredInvestigationsCount(widgetId),
		[widgetId]
	)

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
	useInvestigationsCounterOnUpdate(userId, onCounterUpdate)
}

export const useFilteredSortedInvestigations = (
	widgetId: string
): [AsyncStatus, Investigation[]] => {
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

type UseReassignInvestigationDataType = {| fixMode: boolean |} & (
	| {
			type: 'buildType',
			projectId: ProjectId,
			testId: number,
			buildsIds: BuildId[],
			...
	  }
	| { type: 'problem', problemId: number, buildId: BuildId, ... }
	| { type: 'test', buildTypeId: BuildTypeId, buildTypeName: string, ... }
)

export const useReassignInvestigation: (
	data: UseReassignInvestigationDataType
) => () => void = TC.hooks.useReassignInvestigation
