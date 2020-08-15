// @flow strict
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { removeWidget } from '../../features/widgets/widgets.slice'
import Button from '@jetbrains/ring-ui/components/button/button'
import type { WidgetId } from '../../features/widgets/widgets.types'

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
