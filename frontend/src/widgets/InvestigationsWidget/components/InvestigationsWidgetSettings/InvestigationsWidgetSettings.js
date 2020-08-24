// @flow strict
import React from 'react'
import SortByOptionSelect from '../SortByOptionSelect/SortByOptionSelect'
import InvestigationsShowFixedOptionsSelector from '../ShowFixedOptionButton/ShowFixedOptionButton'
import InvestigationShowOnlyDefaultBranchButton from '../../options/InvestigationShowOnlyDefaultBranchButton'
import WidgetSettings, {
	Section,
} from '../../../../features/widgets/components/WidgetSettings/WidgetSettings'
import { useThisWidgetId } from '../../../../features/widgets/widgets.hooks'

const InvestigationsWidgetSettings = () => {
	const widgetId = useThisWidgetId()
	return (
		<WidgetSettings
			title="My Investigations Widget Settings"
			description="Widget support: ekaterina.silaeva@jetbrains.com"
		>
			<Section title="Sort By">
				<SortByOptionSelect widgetId={widgetId} />
			</Section>
			<Section title="Show Fixed">
				<InvestigationsShowFixedOptionsSelector widgetId={widgetId} />
			</Section>
			<Section title="Only Default Branch">
				<InvestigationShowOnlyDefaultBranchButton widgetId={widgetId} />
			</Section>
		</WidgetSettings>
	)
}

export default InvestigationsWidgetSettings
