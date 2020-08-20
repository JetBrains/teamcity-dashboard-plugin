// @flow strict
import React, { useMemo } from 'react'
import InvestigationsSortingOptionSelector from './options/InvestigationsSortingOptionSelector'
import InvestigationsShowFixedOptionsSelector from './components/ShowFixedOptionButton/ShowFixedOptionButton'
import InvestigationsWidgetContent from './content/InvestigationsWidgetContent'
import WidgetBody from '../../components/WidgetBody/WidgetBody'
import { useThisWidgetId } from '../../features/widgets/widgets.hooks'

const InvestigationsWidget = () => {
	const widgetId = useThisWidgetId()

	const inBodyOptions: Array<React$Node> = useMemo(
		(): Array<React$Node> => [
			<InvestigationsSortingOptionSelector key={0} widgetId={widgetId} />,
			<InvestigationsShowFixedOptionsSelector
				key={1}
				widgetId={widgetId}
			/>,
		],
		[widgetId]
	)

	const content = useMemo(
		() => <InvestigationsWidgetContent widgetId={widgetId} />,
		[widgetId]
	)

	return <WidgetBody options={inBodyOptions}>{content}</WidgetBody>
}

export default InvestigationsWidget
