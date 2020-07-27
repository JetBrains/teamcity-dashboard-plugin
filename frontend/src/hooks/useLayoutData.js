// @flow
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectLayout,
	setLayout,
	type Layout,
} from '../store/slices/layoutSlice'
import { type SetNewDataFunction } from '../commontypes'
import { postDashboardData } from '../store/slices/postingDashboardData'

export default function useLayoutData(): [Layout, SetNewDataFunction<Layout>] {
	const layout = useSelector(selectLayout)
	const dispatch = useDispatch()

	const setNewLayout = useCallback(
		(newLayout: Layout) => {
			dispatch(setLayout(newLayout))
			dispatch(postDashboardData())
		},
		[dispatch]
	)

	return [layout, setNewLayout]
}
