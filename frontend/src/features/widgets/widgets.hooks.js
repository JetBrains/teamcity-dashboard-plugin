// @flow strict
import { useCallback, useMemo, useContext } from 'react'
import {
	removeWidget,
	selectWidgetById,
	selectWidgetDataType,
	selectWidgetOption,
	setWidgetOption,
	updateWidget,
} from './widgets.slice'
import { useDispatch, useSelector } from 'react-redux'
import type { WidgetData, WidgetId, WidgetType } from './widgets.types'
import type { RootState } from '../../store'
import usePostDashboardData from '../../hooks/usePostDashboardData'
import thisWidgetIdContext from './components/ThisWidgetGeneralDataProvider/thisWidgetId.context'
import type { Json } from '../../commontypes'
import {
	selectTopLevelWidgetStateProperty,
	setTopLevelWidgetState,
} from './topLevelWidgetsState.slice'
import thisWidgetTypeContext from './components/ThisWidgetGeneralDataProvider/thisWidgetType.context'
import {
	selectWidgetStateProperty,
	setWidgetStateProperty,
} from './widgetsState.slice'

export const useWidgetData = (
	id: string
): [WidgetData, (newWidgetData: WidgetData) => void, () => void] => {
	const widgetData: ?WidgetData = useSelector((state: RootState) =>
		selectWidgetById(state, id)
	)
	const postDashboardData = usePostDashboardData()
	const dispatch = useDispatch()
	if (widgetData === undefined || widgetData === null) {
		throw new Error(`WidgetData with id=${id} does not exist`)
	}
	const setWidgetData = useCallback(
		(newWidgetData: WidgetData) => {
			dispatch(updateWidget(newWidgetData))
			postDashboardData()
		},
		[dispatch, postDashboardData]
	)
	const deleteWidget = useCallback(() => {
		dispatch(removeWidget(widgetData.id))
	}, [dispatch, widgetData])
	return [widgetData, setWidgetData, deleteWidget]
}

export const useRemoveWidget = (widgetId: WidgetId): (() => void) => {
	const dispatch = useDispatch()
	return useCallback(() => {
		dispatch(removeWidget(widgetId))
	}, [dispatch, widgetId])
}

export const useRemoveThisWidget = (): (() => void) => {
	const id = useThisWidgetId()
	return useRemoveWidget(id)
}

export const useWidgetType = (widgetId: string): ?WidgetType =>
	useSelector((state) => selectWidgetDataType(state, widgetId))

export const useWidgetOption = <T>(
	widgetId: WidgetId,
	optionName: string,
	defaultValue: T
): [T, (T) => void] => {
	const selector = useMemo(
		() => selectWidgetOption(optionName, defaultValue),
		[defaultValue, optionName]
	)
	const dispatch = useDispatch()
	const widgetOptionValue = useSelector((state) => selector(state, widgetId))

	const setWidgetOptionValue = useCallback(
		(newValue: T) =>
			dispatch(setWidgetOption(widgetId, optionName, newValue)),
		[dispatch, optionName, widgetId]
	)
	return [widgetOptionValue, setWidgetOptionValue]
}

export const useWidgetState = <T: Json>(
	widgetId: WidgetId,
	propertyName: string,
	initialValue: T
): [T, (T) => void] => {
	const selector = useMemo(
		() => selectWidgetStateProperty(propertyName, initialValue),
		[initialValue, propertyName]
	)
	const dispatch = useDispatch()

	const value = useSelector((state) => selector(state, widgetId))

	const setValue = useCallback(
		(newValue: T) =>
			dispatch(setWidgetStateProperty(widgetId, propertyName, newValue)),
		[dispatch, propertyName, widgetId]
	)

	return [value, setValue]
}

export const useWidgetTopLevelState = <T: Json>(
	type: WidgetType | '$global',
	propertyName: string,
	initialValue: T
): [T, (T) => void] => {
	const selector = useMemo(
		() => selectTopLevelWidgetStateProperty(propertyName, initialValue),
		[initialValue, propertyName]
	)
	const value = useSelector((state) => selector(state, type))
	const dispatch = useDispatch()
	const setValue = useCallback(
		(newValue: T) =>
			dispatch(setTopLevelWidgetState(type, propertyName, newValue)),
		[dispatch, propertyName, type]
	)
	return [value, setValue]
}

export const useWidgetGlobalState = <T: Json>(
	propertyName: string,
	initialValue: T
): [T, (T) => void] => {
	return useWidgetTopLevelState('$global', propertyName, initialValue)
}

export const useThisWidgetId = (): WidgetId => {
	const id = useContext(thisWidgetIdContext)

	if (id === undefined || id === null) {
		console.error(
			'useThisWidgetId() was called outside of a this widget id provider (maybe outside of the widget).' +
				'This hook uses "thisWidgetIdContext" context which is provided by ThisWidgetGeneralDataProviderComponent react component'
		)
	}
	return id ?? 'errorId'
}

export const useThisWidgetType = (): WidgetType => {
	const type = useContext(thisWidgetTypeContext)

	if (type === undefined || type === null) {
		console.error(
			'useThisWidgetId() was called outside of a this widget type provider (maybe outside of the widget or its top level component).' +
				'This hook uses "thisWidgetTypeContext" context which is provided by ThisWidgetGeneralDataProviderComponent react component'
		)
	}
	return type ?? 'errorType'
}

export const useThisWidgetOption = <T>(
	optionName: string,
	defaultValue: T
): [T, (T) => void] => {
	const id = useThisWidgetId()
	return useWidgetOption(id, optionName, defaultValue)
}

export const useThisWidgetState = <T: Json>(
	propertyName: string,
	initialValue: T
): [T, (T) => void] => {
	const id = useThisWidgetId()
	return useWidgetState(id, propertyName, initialValue)
}

export const useThisWidgetTopLevelState = <T: Json>(
	propertyName: string,
	initialValue: T
): [T, (T) => void] => {
	const type = useThisWidgetType()
	return useWidgetTopLevelState(type, propertyName, initialValue)
}
