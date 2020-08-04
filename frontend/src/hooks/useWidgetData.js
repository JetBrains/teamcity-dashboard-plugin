// @flow strict
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	removeWidget,
	selectWidgetById,
	updateWidget,
	type WidgetData,
} from '../store/slices/widgetsSlice'
import { type RootState } from '../store'
import usePostDashboardData from './usePostDashboardData'

export default function useWidgetData(
	id: string
): [WidgetData, (newWidgetData: WidgetData) => void, () => void] {
	const widgetData: ?WidgetData = useSelector((state: RootState) =>
		selectWidgetById(state, id)
	)
	const postDashboardData = usePostDashboardData()
	const dispatch = useDispatch()
	if (widgetData === undefined || widgetData === null) {
		throw new Error(`WidgetData with id=${id} does not exist`)
	}
	const setWidgetData = useCallback(
		(newWidgetData: WidgetData) => {
			dispatch(updateWidget(newWidgetData))
			postDashboardData()
		},
		[dispatch, postDashboardData]
	)
	const deleteWidget = useCallback(() => {
		dispatch(removeWidget(widgetData.id))
	}, [dispatch, widgetData])
	return [widgetData, setWidgetData, deleteWidget]
}
