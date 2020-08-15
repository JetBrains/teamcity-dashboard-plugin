// @flow strict
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@jetbrains/ring-ui/components/button/button'
import { openWidgetSettings } from '../../features/widgets/widgets.slice'
import type { WidgetId } from '../../features/widgets/widgets.types'

interface Properties {
	widgetId: WidgetId;
}

const WidgetOpenSettingsButton = ({ widgetId }: Properties) => {
	const dispatch = useDispatch()
	const onClick = useCallback(() => {
		dispatch(openWidgetSettings(widgetId))
	}, [dispatch, widgetId])
	return <Button onClick={onClick}>Edit</Button>
}

export default WidgetOpenSettingsButton
