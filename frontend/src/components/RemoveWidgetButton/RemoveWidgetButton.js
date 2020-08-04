// @flow strict
import React, { useCallback } from 'react'
import type { WidgetId } from '../../store/slices/widgetsSlice'
import { useDispatch } from 'react-redux'
import { removeWidget } from '../../store/slices/widgetsSlice'
import Button from '@jetbrains/ring-ui/components/button/button'

interface Properties {
	widgetId: WidgetId;
}

const RemoveWidgetButton = ({ widgetId }: Properties) => {
	const dispatch = useDispatch()
	const onClick = useCallback(() => dispatch(removeWidget(widgetId)), [
		dispatch,
		widgetId,
	])
	return (
		<Button danger onClick={onClick}>
			Remove widget
		</Button>
	)
}

export default RemoveWidgetButton
