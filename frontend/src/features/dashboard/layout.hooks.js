// @flow strict
import type { LayoutState } from './layout.types'
import { useDispatch, useSelector } from 'react-redux'
import { selectLayout, setLayout } from './layout.slice'
import usePostDashboardData from '../../hooks/usePostDashboardData'
import { useCallback } from 'react'

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
