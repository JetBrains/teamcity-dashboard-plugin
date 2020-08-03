// @flow strict
import { useMemo } from 'react'
import type { AsyncStatus } from '../../commontypes'
import type { Investigation } from '../../store/slices/investigationsSlice'
import { useSelector } from 'react-redux'
import { selectInvestigationsStatus } from '../../store/slices/investigationsSlice'
import useInvestigationsSubscription from './useInvestigationsSubscription'
import { selectFilteredSortedInvestigations } from '../../store/selectors/investigations'
import {
	selectBuildTypesHash,
} from '../../store/slices/buildTypesSlice'

const useFilteredSortedInvestigations = (
	widgetId: string
): [AsyncStatus, Investigation[]] => {
	useInvestigationsSubscription()
	const status = useSelector(selectInvestigationsStatus)
	const selector = useMemo(
		() => selectFilteredSortedInvestigations(widgetId),
		[widgetId]
	)
	const buildTypes = useSelector(selectBuildTypesHash)
	console.log('passing buildTypes to selector', buildTypes)
	const investigations = useSelector(state => selector(state, buildTypes))
	return [status, investigations]
}

export default useFilteredSortedInvestigations
