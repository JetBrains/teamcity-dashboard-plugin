// @flow strict
import { useState } from 'react'
import useToggle from './useToggle'

const useToggleState = (initialValue: boolean): [boolean, () => void] => {
	const [value, setValue] = useState(initialValue)
	const toggleValue = useToggle(value, setValue)
	return [value, toggleValue]
}

export default useToggleState
