// @flow strict
import { useCallback } from 'react'
import { defaultThrottleTime } from '../config/config'
import throttle from 'just-throttle'

const useThrottle = <T>(
	func: (T) => mixed,
	timeout?: number = defaultThrottleTime
): ((T) => void) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useCallback((throttle(func, timeout): (T) => void), [func, timeout])
}

export default useThrottle
