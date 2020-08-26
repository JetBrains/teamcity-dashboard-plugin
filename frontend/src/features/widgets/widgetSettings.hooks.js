// @flow strict
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	cancelWidgetSettings,
	openWidgetSettings,
	saveWidgetSettings,
	selectAreWidgetSettingsOpened,
	selectWidgetSettingsIsWidgetNew,
	selectWidgetSettingsWidgetId,
	startAddingNewWidget,
} from './widgetSettings.slice'
import type { WidgetId, WidgetType } from './widgets.types'
import { useThisWidgetId } from './widgets.hooks'

export const useAreWidgetSettingsOpened = (): boolean =>
	useSelector(selectAreWidgetSettingsOpened)

export const useWidgetSettingsWidgetId = (): ?WidgetId =>
	useSelector(selectWidgetSettingsWidgetId)

export const useWidgetSettingsIsWidgetNew = (): boolean =>
	useSelector(selectWidgetSettingsIsWidgetNew)

export const useOpenWidgetSettings = (widgetId: WidgetId): (() => void) => {
	const dispatch = useDispatch()

	return useCallback(() => dispatch(openWidgetSettings(widgetId)), [
		dispatch,
		widgetId,
	])
}

export const useOpenThisWidgetSettings = (): (() => void) => {
	const id = useThisWidgetId()
	return useOpenWidgetSettings(id)
}

export const useCancelWidgetSettings = (): (() => void) => {
	const dispatch = useDispatch()
	return useCallback(() => dispatch(cancelWidgetSettings()), [dispatch])
}

export const useSaveWidgetSettings = (): (() => void) => {
	const dispatch = useDispatch()
	const areSettingsOpened = useAreWidgetSettingsOpened()
	const id = useWidgetSettingsWidgetId()
	const isNew = useWidgetSettingsIsWidgetNew()

	return useCallback(
		() =>
			areSettingsOpened
				? dispatch(
						saveWidgetSettings({
							id,
							isNew,
						})
				  )
				: undefined,
		[areSettingsOpened, dispatch, id, isNew]
	)
}

export const useStartAddingNewWidget = (): ((
	WidgetType,
	openSettings?: boolean
) => void) => {
	const dispatch = useDispatch()

	return useCallback(
		(type: WidgetType, openSettings?: boolean) =>
			dispatch(startAddingNewWidget(type, openSettings)),
		[dispatch]
	)
}
