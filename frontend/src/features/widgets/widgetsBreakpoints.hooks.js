// @flow strict

import { useCallback, useEffect, useState, useMemo } from 'react'
import classnames from 'classnames'
import type { BreakpointName } from './config/widgetProperties.types'
import { useThisWidgetId } from './widgets.hooks'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectWidgetActiveBreakpoints,
	selectWidgetCurrentBreakpoint,
	setWidgetWidth,
} from './widgetsBreakpoints.slice'
import throttle from 'just-throttle'

export const useThisWidgetCurrentBreakpoint = (): ?BreakpointName => {
	const id = useThisWidgetId()
	return useSelector((state) => selectWidgetCurrentBreakpoint(state, id))
}

export const useThisWidgetActiveBreakpoints = (): BreakpointName[] => {
	const id = useThisWidgetId()
	return useSelector((state) => selectWidgetActiveBreakpoints(state, id))
}

export const useIsBreakpointActive = (breakpoint: BreakpointName): boolean => {
	const activeBreakpoints = useThisWidgetActiveBreakpoints()
	return activeBreakpoints.includes(breakpoint)
}

export const useActiveBreakpointClassNames = (
	classes: {
		[breakpoint: BreakpointName]: string,
		...
	},
	alwaysActiveClassname?: string
): string => {
	const activeBreakpoints = useThisWidgetActiveBreakpoints()
	return useMemo(() => {
		const activeClasses = activeBreakpoints.map(
			(breakpoint) => classes[breakpoint]
		)
		return classnames(alwaysActiveClassname, activeClasses)
	}, [activeBreakpoints, alwaysActiveClassname, classes])
}

export const useSaveThisWidgetWidth = (currentWidth: ?number) => {
	const dispatch = useDispatch()
	const id = useThisWidgetId()
	const [previousWidth, setPreviousWidth] = useState(currentWidth)

	const saveWidth = useCallback(
		(width: ?number) => dispatch(setWidgetWidth(id, width)),
		[dispatch, id]
	)

	const throttledSaveWidth: (
		width: ?number
		// eslint-disable-next-line react-hooks/exhaustive-deps
	) => mixed = useCallback(throttle(saveWidth, 300), [saveWidth])

	useEffect(() => {
		if (currentWidth === previousWidth) {
			return
		}
		if (previousWidth !== null && previousWidth !== undefined) {
			throttledSaveWidth(currentWidth)
		} else {
			saveWidth(currentWidth)
		}
		setPreviousWidth(currentWidth)
	}, [currentWidth, previousWidth, saveWidth, throttledSaveWidth])
}
