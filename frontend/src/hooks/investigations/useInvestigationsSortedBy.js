// @flow strict

import type { Investigation } from '../../store/slices/investigationsSlice'
import {
	fetchInvestigations,
	selectAllInvestigations,
	selectInvestigationsSortedByName,
	selectInvestigationsStatus,
} from '../../store/slices/investigationsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import type { AsyncStatus } from '../../commontypes'

export type InvestigationsSortingOption = 'name' | 'time'

const useInvestigationsSortedBy = (
	sortingOption: InvestigationsSortingOption
): [AsyncStatus, Investigation[]] => {
	const selector =
		sortingOption === 'time'
			? selectAllInvestigations
			: selectInvestigationsSortedByName
	const fetchingStatus = useSelector(selectInvestigationsStatus)
	const investigations = useSelector(selector)
	const dispatch = useDispatch()

	useEffect(() => {
		// TODO: userId can be not 1
		dispatch(fetchInvestigations(1))
	}, [dispatch])

	return [fetchingStatus, investigations]
}

export default useInvestigationsSortedBy
