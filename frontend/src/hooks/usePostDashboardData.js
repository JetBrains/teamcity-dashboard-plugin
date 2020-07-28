// @flow strict
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import debounce from '../utils/debounce'
import { postDashboardData } from '../store/slices/postingDashboardData'
import { POST_DASHBOARD_DATA_TO_SERVER_DEBOUNCE_DELAY } from '../config/config'

// TODO: move 5000 to some constant in `config/`
const usePostDashboardData = (): () => void => {
	const dispatch = useDispatch()
	return useCallback(
		debounce(() => {
			dispatch(postDashboardData())
		}, POST_DASHBOARD_DATA_TO_SERVER_DEBOUNCE_DELAY),
		[dispatch]
	);
}

export default usePostDashboardData;
