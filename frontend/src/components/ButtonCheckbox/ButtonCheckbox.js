// @flow strict
import React, { useCallback } from 'react'
import Button from '@jetbrains/ring-ui/components/button/button'

interface Properties {
	onChange: (boolean) => void;
	checked: boolean;
	children: React$Node;
}

const ButtonCheckbox = ({ onChange, checked, children }: Properties) => {
	const onClick = useCallback(() => onChange(!checked), [onChange, checked])

	return (
		<Button active={checked} onClick={onClick}>
			{children}
		</Button>
	)
}

export default ButtonCheckbox
