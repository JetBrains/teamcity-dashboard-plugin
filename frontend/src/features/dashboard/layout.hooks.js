// @flow strict
import type { LayoutState } from './layout.types'
import { useDispatch, useSelector } from 'react-redux'
import { setLayout } from './layout.slice'
import { useCallback } from 'react'
import { usePostDashboardData } from './postingDashboardData.hooks'
import { selectLayout } from './layout.selectors'

export const useLayoutData = (): [LayoutState, (LayoutState) => void] => {
	const layout = useSelector(selectLayout)
	const dispatch = useDispatch()
	const postDashboardData = usePostDashboardData()

	const setNewLayout = useCallback(
		(newLayout: LayoutState) => {
			dispatch(setLayout(newLayout))
			postDashboardData()
		},
		[dispatch, postDashboardData]
	)

	return [layout, setNewLayout]
}
