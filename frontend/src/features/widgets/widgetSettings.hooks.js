// @flow strict
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	closeWidgetSettings,
	openWidgetSettings,
	selectAreWidgetSettingsOpened,
	selectWidgetSettingsIsWidgetNew,
	selectWidgetSettingsWidgetId,
	selectWidgetSettingsWidgetType,
} from './widgetSettings.slice'
import { useThisWidgetId, useThisWidgetType } from './widgets.hooks'
import { addWidgetFromSettings, saveWidgetSettings } from './widgets.slice'
import { usePostDashboardData } from '../dashboard/postingDashboardData.hooks'

export const useAreWidgetSettingsOpened = (): boolean =>
	useSelector(selectAreWidgetSettingsOpened)

export const useOpenThisWidgetSettings = (): (() => void) => {
	const dispatch = useDispatch()
	const id = useThisWidgetId()
	const type = useThisWidgetType()

	return useCallback(
		() =>
			dispatch(
				openWidgetSettings({
					id,
					type,
					isNew: false,
				})
			),
		[dispatch, id, type]
	)
}

export const useCancelWidgetSettings = (): (() => void) => {
	const dispatch = useDispatch()
	return useCallback(() => dispatch(closeWidgetSettings()), [dispatch])
}

export const useSaveThisWidgetSettings = (): (() => void) => {
	const dispatch = useDispatch()
	const postDashboardData = usePostDashboardData()
	const areSettingsOpened = useAreWidgetSettingsOpened()
	const id = useSelector(selectWidgetSettingsWidgetId)
	const type = useSelector(selectWidgetSettingsWidgetType)
	const isNew = useSelector(selectWidgetSettingsIsWidgetNew)

	return useCallback(() => {
		if (!areSettingsOpened || type === null || type === undefined) {
			return
		}
		if (isNew || id === null || id === undefined) {
			dispatch(addWidgetFromSettings())
			dispatch(closeWidgetSettings())
		} else {
			dispatch(saveWidgetSettings(id))
			dispatch(closeWidgetSettings())
		}
		postDashboardData()
	}, [areSettingsOpened, dispatch, id, isNew, postDashboardData, type])
}
