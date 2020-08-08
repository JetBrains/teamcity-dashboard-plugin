// @flow strict

import type { WidgetId } from '../../store/slices/widgetsSlice'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { openWidgetSettings } from '../../store/slices/widgetsSlice'

const useOpenWidgetSettings = (widgetId: WidgetId): () => void => {
	const dispatch = useDispatch()
	return useCallback(() => {
		dispatch(openWidgetSettings(widgetId))
	}, [dispatch, widgetId])
}

export default useOpenWidgetSettings
