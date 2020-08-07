// @flow strict
import React from 'react'
import useInvestigationsWidgetShowOnlyDefaultBranchOption from '../../../hooks/widgets/investigationsWidget/useInvestigationsWidgetShowOnlyDefaultBranchOption'
import Button from '@jetbrains/ring-ui/components/button/button'
import useToggle from '../../../hooks/basic/useToggle'

interface Properties {
	widgetId: string;
}

const InvestigationShowOnlyDefaultBranchButton = ({ widgetId }: Properties) => {
	const [
		showOnlyDefaultBranch,
		setShowOnlyDefaultBranch,
	] = useInvestigationsWidgetShowOnlyDefaultBranchOption(widgetId)
	const toggle = useToggle(showOnlyDefaultBranch, setShowOnlyDefaultBranch)

	return (
		<Button onClick={toggle}>
			{showOnlyDefaultBranch
				? 'Show all branches'
				: 'Show only default branch'}
		</Button>
	)
}

export default InvestigationShowOnlyDefaultBranchButton
