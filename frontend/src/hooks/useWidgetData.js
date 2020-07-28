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
import { postDashboardData } from '../store/slices/postingDashboardData'

export default function useWidgetData(
	id: string
): [WidgetData, (newWidgetData: WidgetData) => void, () => void] {
	const widgetData: ?WidgetData = useSelector((state: RootState) =>
		selectWidgetById(state, id)
	)
	if (widgetData === undefined || widgetData === null) {
		throw new Error(`WidgetData with id=${id} does not exist`)
	}

	const dispatch = useDispatch()
	const setWidgetData = useCallback(
		(newWidgetData: WidgetData) => {
			dispatch(updateWidget(newWidgetData))
			dispatch(postDashboardData())
		},
		[dispatch]
	)
	const deleteWidget = useCallback(
		() => {
			dispatch(removeWidget(widgetData))
		},
		[dispatch, widgetData]
	)
	return [widgetData, setWidgetData, deleteWidget]
}
