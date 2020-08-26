// @flow strict
import React from 'react'
import { useThisWidgetId } from '../../../../features/widgets/widgets.hooks'
import { useFilteredInvestigationsCount } from '../../../../features/investigations/investigations.hooks'
import SimpleTextWidgetHeader from '../../../../features/widgets/components/SimpleTextWidgetHeader/SimpleTextWidgetHeader'

const InvestigationsWidgetHeader = () => {
	const widgetId = useThisWidgetId()
	const investigationsCount = useFilteredInvestigationsCount(widgetId)

	return (
		<SimpleTextWidgetHeader>
			My investigations: {investigationsCount}
		</SimpleTextWidgetHeader>
	)
}

export default InvestigationsWidgetHeader
