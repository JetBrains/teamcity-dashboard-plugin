// @flow strict
import { useCallback } from 'react'

const useToggle = (
	value: boolean,
	setValue: (boolean) => void
): (() => void) => {
	return useCallback(() => setValue(!value), [setValue, value])
}

export default useToggle
