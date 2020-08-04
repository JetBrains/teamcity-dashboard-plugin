// @flow strict
import React, { useCallback } from 'react'
import Checkbox from '@jetbrains/ring-ui/components/checkbox/checkbox'
import useInvestigationsWidgetShowFixedOption from '../../../hooks/widgets/investigationsWidget/useInvestigationsWidgetShowFixedOption'

interface Properties {
	widgetId: string;
}

const InvestigationsShowFixedOptionsSelector = ({ widgetId }: Properties) => {
	const [showFixed, setShowFixed] = useInvestigationsWidgetShowFixedOption(
		widgetId
	)

	const onChange = useCallback(() => setShowFixed(!showFixed), [
		setShowFixed,
		showFixed,
	])

	return (
		<Checkbox
			label="Show fixed"
			onChange={onChange}
			defaultChecked={showFixed}
		/>
	)
}

export default InvestigationsShowFixedOptionsSelector
