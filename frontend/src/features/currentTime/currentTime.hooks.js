// @flow strict
import {useMemo, useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentTime, subscribeOnCurrentTime, unsubscribeFromCurrentTime } from './currentTime.slice'

export const useCurrentTime = (): Date => {
	const dispatch = useDispatch()
	const currentTime = useSelector(selectCurrentTime)

	useEffect(() => {
		dispatch(subscribeOnCurrentTime())
		return () => dispatch(unsubscribeFromCurrentTime())
	}, [dispatch])

	return useMemo(() => new Date(currentTime), [currentTime])
}

export const useGetCurrentTime = (): () => Date => {
	const time = useCurrentTime()
	return useCallback(() => time, [time])
}
