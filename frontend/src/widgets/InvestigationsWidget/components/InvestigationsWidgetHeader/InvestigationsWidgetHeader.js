// @flow strict
import React from 'react'
import {
	useFilteredInvestigationsCount,
} from '../../../../features/investigations/investigations.hooks'
import SimpleTextWidgetHeader from '../../../../features/widgets/components/SimpleTextWidgetHeader/SimpleTextWidgetHeader'

const InvestigationsWidgetHeader = () => {
	const investigationsCount = useFilteredInvestigationsCount()

	return (
		<SimpleTextWidgetHeader>
			My investigations: {investigationsCount}
		</SimpleTextWidgetHeader>
	)
}

export default InvestigationsWidgetHeader
