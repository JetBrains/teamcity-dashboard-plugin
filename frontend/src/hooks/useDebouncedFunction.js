// @flow strict
import { useCallback, useEffect, useState } from 'react'

// TODO: not used yet, plan to use later
export default function useDebouncedFunction<T>(
	fn: (arg: T) => void,
	delay: number
): (arg: T) => void {
	const [isDebounced, setIsDebounced] = useState(false)
	const [savedArgument, setSavedArgument] = useState<?T>()

	const debouncedFunction = useCallback(
		(argument: T) => {
			if (!isDebounced) {
				fn(argument)
				setIsDebounced(true)
			} else {
				setSavedArgument(argument)
			}
		},
		[fn, isDebounced]
	)

	useEffect(() => {
		if (isDebounced) {
			const timeoutId = window.setTimeout(() => {
				setIsDebounced(false)
			}, delay)
			return () => {
				clearTimeout(timeoutId)
			}
		} else if (savedArgument !== null && savedArgument !== undefined) {
			fn(savedArgument)
			setSavedArgument()
		}
	}, [delay, fn, isDebounced, savedArgument])

	return debouncedFunction
}
