// @flow strict
import React, { useCallback } from 'react'
import classNames from 'classnames'
import useInvestigationsWidgetShowFixedOption from '../../../../hooks/widgets/investigationsWidget/useInvestigationsWidgetShowFixedOption'
import Button from '@jetbrains/ring-ui/components/button/button'

import styles from './ShowFixedOptionButton.css'

interface Properties {
	widgetId: string;
	className?: ?string;
}

const InvestigationsShowFixedOptionsSelector = ({
	widgetId,
	className,
}: Properties) => {
	const [showFixed, setShowFixed] = useInvestigationsWidgetShowFixedOption(
		widgetId
	)

	const onClick = useCallback(() => setShowFixed(!(showFixed ?? false)), [
		setShowFixed,
		showFixed,
	])

	return (
		<Button
			onClick={onClick}
			className={classNames(styles.ShowFixedOptionButton, className)}
		>
			{showFixed ?? false ? 'Hide Fixed' : 'Show Fixed'}
		</Button>
	)
}

export default InvestigationsShowFixedOptionsSelector
