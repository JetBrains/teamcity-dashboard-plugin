// @flow strict
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchInvestigations } from '../../store/slices/investigationsSlice'
import { nanoid } from '@reduxjs/toolkit'

const useInvestigationsSubscription = (userId: number = 1) => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchInvestigations())
	}, [dispatch])
	useEffect(() => {
		// eslint-disable-next-line no-undef
		return BS.SubscriptionManager.subscribe(
			`investigationsCounter/${userId}`,
			() => {
				console.log('investigationsCounter/ BS update')
				dispatch(fetchInvestigations())
			},
			nanoid()
		)
	}, [dispatch, userId])
}

export default useInvestigationsSubscription
