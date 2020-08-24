// @flow strict
import React, { useMemo } from 'react'
import SortByOptionSelect from '../SortByOptionSelect/SortByOptionSelect'
import InvestigationsShowFixedOptionsSelector from '../ShowFixedOptionButton/ShowFixedOptionButton'
import InvestigationsWidgetContent from '../../content/InvestigationsWidgetContent'
import WidgetBody from '../../../../components/WidgetBody/WidgetBody'
import { useThisWidgetId } from '../../../../features/widgets/widgets.hooks'

import styles from './InvestigationsWidgetBody.css'

const InvestigationsWidgetBody = () => {
	const widgetId = useThisWidgetId()

	const inBodyOptions: Array<React$Node> = useMemo(
		(): Array<React$Node> => [
			<SortByOptionSelect
				key={0}
				widgetId={widgetId}
				className={styles.sortBy}
			/>,
			<InvestigationsShowFixedOptionsSelector
				key={1}
				widgetId={widgetId}
				className={styles.showFixed}
			/>,
		],
		[widgetId]
	)

	const content = useMemo(
		() => <InvestigationsWidgetContent widgetId={widgetId} />,
		[widgetId]
	)

	return (
		<WidgetBody options={inBodyOptions} optionsClassName={styles.options}>
			{content}
		</WidgetBody>
	)
}

export default InvestigationsWidgetBody
