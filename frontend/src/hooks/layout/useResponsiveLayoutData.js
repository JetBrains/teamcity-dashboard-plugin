// @flow strict
import { useMemo, useCallback } from 'react'
import useLayoutData from './useLayoutData'
import type { Layout } from '../../store/slices/layoutSlice'

export type Layouts = {
	lg: Layout,
	...
}

const breakpoints = { lg: 1000 }
const cols = { lg: 10 }

const useResponsiveLayoutData = (): [
	Layouts,
	(Layouts) => void,
	typeof breakpoints,
	typeof cols
] => {
	const [layout, setLayout] = useLayoutData()

	const responsiveLayouts = useMemo(
		() => ({
			lg: layout,
		}),
		[layout]
	)

	const setResponsiveLayouts = useCallback(
		(layouts: Layouts) => setLayout(layouts.lg),
		[setLayout]
	)

	return [responsiveLayouts, setResponsiveLayouts, breakpoints, cols]
}

export default useResponsiveLayoutData
