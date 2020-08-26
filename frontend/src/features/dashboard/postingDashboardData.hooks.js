// @flow strict
import {useCallback} from 'react'
import { useDispatch } from 'react-redux'
import { debouncedPostDashboardData } from './postingDashboardData.slice'

export const usePostDashboardData = (): () => void => {
	const dispatch = useDispatch()

	return useCallback(() => {
		dispatch(debouncedPostDashboardData())
	}, [dispatch])
}
