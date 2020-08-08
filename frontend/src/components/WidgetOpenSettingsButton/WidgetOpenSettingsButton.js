// @flow strict
import React, {useCallback} from 'react'
import { useDispatch } from 'react-redux'
import Button from '@jetbrains/ring-ui/components/button/button'
import { openWidgetSettings } from '../../store/slices/widgetsSlice'
import type { WidgetId } from '../../store/slices/widgetsSlice'

interface Properties {
	widgetId: WidgetId
}

const WidgetOpenSettingsButton = ({ widgetId }: Properties) => {
	const dispatch = useDispatch()
	const onClick = useCallback(() => {
		dispatch(openWidgetSettings(widgetId))
	}, [dispatch, widgetId])
	return (
		<Button onClick={onClick}>Edit</Button>
	)
}

export default WidgetOpenSettingsButton
