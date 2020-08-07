// @flow strict
import React, { useMemo } from 'react'
import WidgetIsland from '../../components/WidgetIsland/WidgetIsland'
import InvestigationsSortingOptionSelector from './options/InvestigationsSortingOptionSelector'
import type { WidgetComponent } from '../widgets'
import InvestigationsShowFixedOptionsSelector from './options/InvestigationsShowFixedOptionSelector'
import InvestigationsWidgetContent from './content/InvestigationsWidgetContent'
import InvestigationsWidgetHeader from './header/InvestigationsWidgetHeader/InvestigationsWidgetHeader'
import WidgetEllipsisOptions from '../../components/WidgetEllipsisOptions/WidgetEllipsisOptions'
import WidgetBody from '../../components/WidgetBody/WidgetBody'
import InvestigationShowOnlyDefaultBranchButton from './options/InvestigationShowOnlyDefaultBranchButton'

interface Properties {
	widgetId: string;
}

const InvestigationsWidget: WidgetComponent = ({ widgetId }: Properties) => {
	const title = useMemo(
		() => <InvestigationsWidgetHeader widgetId={widgetId} />,
		[widgetId]
	)

	const headerOptions = useMemo(
		() => [<WidgetEllipsisOptions key={0} widgetId={widgetId} />],
		[widgetId]
	)

	const inBodyOptions: Array<React$Node> = useMemo(
		(): Array<React$Node> => [
			<InvestigationsSortingOptionSelector key={0} widgetId={widgetId} />,
			<InvestigationsShowFixedOptionsSelector
				key={1}
				widgetId={widgetId}
			/>,
			<InvestigationShowOnlyDefaultBranchButton key={2} widgetId={widgetId} />
		],
		[widgetId]
	)

	const content = useMemo(
		() => <InvestigationsWidgetContent widgetId={widgetId} />,
		[widgetId]
	)

	return (
		<WidgetIsland title={title} headerOptions={headerOptions}>
			<WidgetBody options={inBodyOptions}>{content}</WidgetBody>
		</WidgetIsland>
	)
}

export default InvestigationsWidget
