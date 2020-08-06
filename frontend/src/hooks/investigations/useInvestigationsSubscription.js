// @flow strict
import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { fetchInvestigations } from '../../store/slices/investigationsSlice'
import type { UserId } from '../../commontypes'
import useInvestigationsCounterOnUpdate from '../TC/useInvestigationsCounterOnUpdate'

const useInvestigationsSubscription = (userId: UserId) => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchInvestigations(userId))
	}, [dispatch, userId])
	const onCounterUpdate = useCallback(() => {
		dispatch(fetchInvestigations(userId))
	}, [dispatch, userId])
	useInvestigationsCounterOnUpdate(userId, onCounterUpdate)
}

export default useInvestigationsSubscription
