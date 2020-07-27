// @flow
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectWidgetById,
	updateWidget,
	type WidgetData,
} from '../store/slices/widgetsSlice'
import { type RootState } from '../store'
import { postDashboardData } from '../store/slices/postingDashboardData'

export default function useWidgetData(
	id: string
): [WidgetData, (newWidgetData: WidgetData) => void] {
	const widgetData: WidgetData | undefined = useSelector((state: RootState) =>
		selectWidgetById(state, id)
	)
	if (widgetData === undefined) {
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
	return [widgetData, setWidgetData]
}
