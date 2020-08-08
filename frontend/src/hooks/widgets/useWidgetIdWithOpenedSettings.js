// @flow strict
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	closeWidgetSettings,
	selectWidgetWithOpenedSettings,
} from '../../store/slices/widgetsSlice'

const useWidgetIdWithOpenedSettings = (): [?string, () => void] => {
	const dispatch = useDispatch()
	const widgetId = useSelector(selectWidgetWithOpenedSettings)

	const closeSettings = useCallback(() => {
		dispatch(closeWidgetSettings())
	}, [dispatch])

	return [widgetId, closeSettings]
}

export default useWidgetIdWithOpenedSettings
