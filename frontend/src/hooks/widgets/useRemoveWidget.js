// @flow strict

import type { WidgetId } from '../../store/slices/widgetsSlice'
import { useCallback } from "react"
import { removeWidget } from '../../store/slices/widgetsSlice'
import { useDispatch } from 'react-redux'

const useRemoveWidget = (widgetId: WidgetId): () => void => {
	const dispatch = useDispatch()
	return useCallback(() => {
		dispatch(removeWidget(widgetId))
	}, [dispatch, widgetId])
}

export default useRemoveWidget
