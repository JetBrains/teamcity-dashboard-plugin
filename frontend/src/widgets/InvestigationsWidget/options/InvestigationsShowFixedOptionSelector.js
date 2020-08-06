// @flow strict
import React, { useCallback } from 'react'
import useInvestigationsWidgetShowFixedOption from '../../../hooks/widgets/investigationsWidget/useInvestigationsWidgetShowFixedOption'
import Button from '@jetbrains/ring-ui/components/button/button'

interface Properties {
	widgetId: string;
}

const InvestigationsShowFixedOptionsSelector = ({ widgetId }: Properties) => {
	const [showFixed, setShowFixed] = useInvestigationsWidgetShowFixedOption(
		widgetId
	)

	const onClick = useCallback(() => setShowFixed(!(showFixed ?? false)), [
		setShowFixed,
		showFixed,
	])

	return (
		<Button onClick={onClick}>
			{showFixed ?? false ? 'Hide Fixed' : 'Show Fixed'}
		</Button>
	)
}

export default InvestigationsShowFixedOptionsSelector
