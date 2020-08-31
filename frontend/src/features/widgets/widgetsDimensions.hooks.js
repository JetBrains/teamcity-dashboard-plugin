// @flow strict
import { useMemo, useEffect, useCallback } from 'react'
import type { BreakpointName } from './config/widgetProperties.types'
import { useThisWidgetId } from './widgets.hooks'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectWidgetActiveBreakpoints,
	selectWidgetWidth,
	setWidgetDimensions,
} from './widgetsDimensions.slice'

import throttle from 'just-throttle'

export const useSaveThisWidgetWidth = (currentWidth: ?number) => {
	const dispatch = useDispatch()
	const id = useThisWidgetId()
	const previousWidth = useSelector((state) => selectWidgetWidth(state, id))

	const saveDimensions = useCallback(
		(width: ?number) => dispatch(setWidgetDimensions(id, width)),
		[dispatch, id]
	)

	const throttledSaveDimensions: (
		width: ?number
		// eslint-disable-next-line react-hooks/exhaustive-deps
	) => mixed = useCallback(throttle(saveDimensions, 500), [saveDimensions])

	useEffect(() => {
		if (currentWidth === previousWidth) {
			return
		}
		if (previousWidth !== null && previousWidth !== undefined) {
			throttledSaveDimensions(currentWidth)
		} else {
			saveDimensions(currentWidth)
		}
	}, [currentWidth, previousWidth, saveDimensions, throttledSaveDimensions])
}

export const useThisWidgetActiveBreakpoints = (): BreakpointName[] => {
	const id = useThisWidgetId()
	const selectThisWidgetActiveBreakpoints = useMemo(
		() => selectWidgetActiveBreakpoints(id),
		[id]
	)
	return useSelector(selectThisWidgetActiveBreakpoints)
}
