// @flow strict
import React from 'react'
import WidgetSettings, {
	Section,
} from '../../../../features/widgets/components/WidgetSettings/WidgetSettings'
import BuildTypeChangesWidgetBuildTypeSelector from '../../options/BuildTypeChangesWidgetBuildTypeSelector'
import BranchWidgetOptionSelector from '../BranchWidgetOptionSelector/BranchWidgetOptionSelector'
import Field from '../../../../features/widgets/components/WidgetSettings/Field/Field'

const BuildTypeChangesWidgetSettings = () => {
	return (
		<WidgetSettings
			title="Changes Widget Settings"
			description="Widget support: ekaterina.silaeva@jetbrains.com"
		>
			<Section>
				<Field>
					<BuildTypeChangesWidgetBuildTypeSelector />
				</Field>
				<Field>
					<BranchWidgetOptionSelector />
				</Field>
			</Section>
		</WidgetSettings>
	)
}

export default BuildTypeChangesWidgetSettings
