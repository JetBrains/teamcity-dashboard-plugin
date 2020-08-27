// @flow strict

import type { CurrentTimeState } from './currentTime.types'
import type { PayloadAction } from '../../commontypes'
import type { RootState } from '../../store'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { type Dispatch } from 'redux'

// 1 min
const UPDATE_PERIOD = 60 * 1000

// Selectors

const selectCurrentTimeSlice = (state: RootState): CurrentTimeState => state.currentTime

const selectSubscribersCount: RootState => number = createSelector(
	selectCurrentTimeSlice,
	(state: CurrentTimeState) => state.subscribersCount
)

export const selectCurrentTime: RootState => number = createSelector(
	selectCurrentTimeSlice,
	(state: CurrentTimeState) => state.currentTime
)

const selectCurrentTimeIntervalId: RootState => ?number = createSelector(
	selectCurrentTimeSlice,
	(state: CurrentTimeState) => state.intervalId,
)

const currentTimeSlice = createSlice<CurrentTimeState>({
	name: 'currentTime',
	initialState: {
		currentTime: Date.now(),
		subscribersCount: 0,
		intervalId: undefined,
	},
	reducers: {
		setCurrentTime: (state: CurrentTimeState, action: PayloadAction<number>) => {
			state.currentTime = action.payload
		},
		addSubscriber: (state: CurrentTimeState, action: PayloadAction<?number>) => {
			const intervalId = action.payload
			if (state.subscribersCount === 0 && intervalId !== null && intervalId !== undefined) {
				state.intervalId = intervalId
			}
			state.subscribersCount++
		},
		removeSubscriber: (state: CurrentTimeState) => {
			if (state.subscribersCount === 1) {
				state.intervalId = undefined
			}
			state.subscribersCount--
		},
	}
})

// Actions

const setCurrentTime: (number) => PayloadAction<number> = currentTimeSlice.actions.setCurrentTime
const addSubscriber: (?number) => PayloadAction<number> = currentTimeSlice.actions.addSubscriber
const removeSubscriber: () => PayloadAction<void> = currentTimeSlice.actions.removeSubscriber

export const subscribeOnCurrentTime = () => (dispatch: Dispatch<*>, getState: () => RootState) => {
	const subscribersNumber = selectSubscribersCount(getState())
	if (subscribersNumber === 0) {
		dispatch(setCurrentTime(Date.now()))
		const intervalId = window.setInterval(() => {
			dispatch(setCurrentTime(Date.now()))
		}, UPDATE_PERIOD)
		dispatch(addSubscriber(intervalId))
	} else {
		dispatch(addSubscriber())
	}
}

export const unsubscribeFromCurrentTime = () => (dispatch: Dispatch<*>, getState: () => RootState) => {
	const state = getState()
	const subscribersCount = selectSubscribersCount(state)
	// if for some reason it was <= 0
	if (subscribersCount <= 1) {
		const intervalId = selectCurrentTimeIntervalId(state)
		if (intervalId !== null && intervalId !== undefined) {
			window.clearInterval(intervalId)
		}
	}
	dispatch(removeSubscriber())
}

// Reducer

export default currentTimeSlice.reducer
