// @flow strict
import {useEffect} from 'react'
import {
	fetchInvestigations,
	selectInvestigationsSortedByName,
	selectInvestigationsStatus,
} from '../../store/slices/investigationsSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { AsyncStatus } from '../../commontypes'
import type { Investigation } from '../../store/slices/investigationsSlice'

const useInvestigations = (userId: number = 1): [AsyncStatus, Investigation[]] => {
	const investigationsStatus = useSelector(selectInvestigationsStatus)
	// const investigations = useSelector(selectAllInvestigations)
	const investigations = useSelector(selectInvestigationsSortedByName)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchInvestigations(userId))
	}, [dispatch, userId])

	return [investigationsStatus, investigations]
}

export default useInvestigations

