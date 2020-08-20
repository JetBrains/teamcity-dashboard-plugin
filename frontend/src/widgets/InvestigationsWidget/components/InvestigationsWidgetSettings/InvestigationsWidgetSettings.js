// @flow strict
import React from 'react'
import InvestigationsSortingOptionSelector from '../../options/InvestigationsSortingOptionSelector'
import InvestigationsShowFixedOptionsSelector from '../ShowFixedOptionButton/ShowFixedOptionButton'
import InvestigationShowOnlyDefaultBranchButton from '../../options/InvestigationShowOnlyDefaultBranchButton'
import WidgetSettings, {
	Section,
} from '../../../../components/WidgetSettings/WidgetSettings'

interface Properties {
	widgetId: string;
}

const InvestigationsWidgetSettings = ({ widgetId }: Properties) => {
	return (
		<WidgetSettings
			title="My Investigations Widget Settings"
			description="Shows your investigations"
		>
			<Section
				title="Sort By"
				description="Select how your investigations are sorted"
			>
				<InvestigationsSortingOptionSelector widgetId={widgetId} />
			</Section>
			<Section
				title="Show Fixed"
				description="Decide whether fixed investigations are shown"
			>
				<InvestigationsShowFixedOptionsSelector widgetId={widgetId} />
			</Section>
			<Section
				title="Only Default Branch"
				description="Show only investigations that affect default branch"
			>
				<InvestigationShowOnlyDefaultBranchButton widgetId={widgetId} />
			</Section>
		</WidgetSettings>
	)
}

export default InvestigationsWidgetSettings
