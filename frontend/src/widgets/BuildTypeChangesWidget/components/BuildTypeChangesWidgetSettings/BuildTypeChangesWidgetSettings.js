// @flow strict
import React from 'react'
import WidgetSettings, {
	Section,
} from '../../../../features/widgets/components/WidgetSettings/WidgetSettings'
import BuildTypeChangesWidgetBuildTypeSelector from '../../options/BuildTypeChangesWidgetBuildTypeSelector'
import BranchWidgetOptionSelector from '../BranchWidgetOptionSelector/BranchWidgetOptionSelector'

const BuildTypeChangesWidgetSettings = () => {
	return (
		<WidgetSettings
			title="Changes Widget Settings"
			description="Widget support: ekaterina.silaeva@jetbrains.com"
		>
			<Section title="Build Configuration">
				<BuildTypeChangesWidgetBuildTypeSelector />
			</Section>
			<Section title="Branch">
				<BranchWidgetOptionSelector />
			</Section>
		</WidgetSettings>
	)
}

export default BuildTypeChangesWidgetSettings
