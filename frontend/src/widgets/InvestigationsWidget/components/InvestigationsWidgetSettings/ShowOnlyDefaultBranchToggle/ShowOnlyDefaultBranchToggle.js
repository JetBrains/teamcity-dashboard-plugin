// @flow strict
import React from 'react'
import useShowOnlyDefaultBranchOption from '../../../hooks/useShowOnlyDefaultBranchOption'
import useToggle from '../../../../../hooks/basic/useToggle'
import Toggle from '@jetbrains/ring-ui/components/toggle/toggle'

type Properties = {|
	className?: ?string,
|}

const ShowOnlyDefaultBranchToggle = ({ className }: Properties) => {
	const [
		showOnlyDefaultBranch,
		setShowOnlyDefaultBranch,
	] = useShowOnlyDefaultBranchOption()

	const toggle = useToggle(showOnlyDefaultBranch, setShowOnlyDefaultBranch)

	return (
		<Toggle
			className={className}
			leftLabel="Show problems only for default branch"
			defaultChecked={showOnlyDefaultBranch}
			onChange={toggle}
		/>
	)
}

export default ShowOnlyDefaultBranchToggle
