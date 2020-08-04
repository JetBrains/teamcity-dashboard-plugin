// @flow strict

import { useSelector } from 'react-redux'
import { selectWidgetDataType } from '../../store/slices/widgetsSlice'
import type { RootState } from '../../store'

const useWidgetType = (
	widgetId: string
): $Call<typeof selectWidgetDataType, RootState, string> => {
	return useSelector((state) => selectWidgetDataType(state, widgetId))
}

export default useWidgetType
