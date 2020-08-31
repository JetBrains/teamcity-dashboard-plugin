// @flow strict
import React from 'react'
import useShowFixedOption from '../../../hooks/useShowFixedOption'
import Toggle from '@jetbrains/ring-ui/components/toggle/toggle'
import useToggle from '../../../../../hooks/basic/useToggle'

type Properties = {|
	className?: ?string,
|}

const ShowFixedToggle = ({ className }: Properties) => {
	const [showFixed, setShowFixed] = useShowFixedOption()

	const toggle = useToggle(showFixed, setShowFixed)

	return (
		<Toggle
			className={className}
			leftLabel="Show fixed investigations"
			defaultChecked={showFixed}
			onChange={toggle}
		/>
	)
}

export default ShowFixedToggle
