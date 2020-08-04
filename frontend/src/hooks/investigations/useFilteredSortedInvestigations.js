// @flow strict
import { useMemo } from 'react'
import type { AsyncStatus } from '../../commontypes'
import type { Investigation } from '../../store/slices/investigationsSlice'
import { useSelector } from 'react-redux'
import { selectInvestigationsStatus, selectFilteredSortedInvestigations } from '../../store/slices/investigationsSlice'
import useInvestigationsSubscription from './useInvestigationsSubscription'

const useFilteredSortedInvestigations = (
	widgetId: string
): [AsyncStatus, Investigation[]] => {
	useInvestigationsSubscription()
	const status = useSelector(selectInvestigationsStatus)
	const selector = useMemo(
		() => selectFilteredSortedInvestigations(widgetId),
		[widgetId]
	)
	const investigations = useSelector(selector)
	return [status, investigations]
}

export default useFilteredSortedInvestigations
