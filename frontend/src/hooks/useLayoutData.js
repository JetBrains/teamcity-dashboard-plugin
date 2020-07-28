// @flow strict
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectLayout,
	setLayout,
	type Layout,
} from '../store/slices/layoutSlice'
import { type SetNewDataFunction } from '../commontypes'
import usePostDashboardData from './usePostDashboardData'

export default function useLayoutData(): [Layout, SetNewDataFunction<Layout>] {
	const layout = useSelector(selectLayout)
	const dispatch = useDispatch()
	const postDashboardData = usePostDashboardData()

	const setNewLayout = useCallback(
		(newLayout: Layout) => {
			dispatch(setLayout(newLayout))
			postDashboardData();
		},
		[dispatch, postDashboardData]
	)

	return [layout, setNewLayout]
}
