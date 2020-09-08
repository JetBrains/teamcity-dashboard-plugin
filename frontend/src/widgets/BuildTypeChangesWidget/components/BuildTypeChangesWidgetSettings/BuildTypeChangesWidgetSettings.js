// @flow strict
import React from 'react'
import WidgetSettings, {
	Section,
} from '../../../../features/widgets/components/WidgetSettings/WidgetSettings'
import BuildTypeChangesWidgetBuildTypeSelector from '../../options/BuildTypeChangesWidgetBuildTypeSelector'
import BranchWidgetOptionSelector from '../BranchWidgetOptionSelector/BranchWidgetOptionSelector'
import Field from '../../../../features/widgets/components/WidgetSettings/Field/Field'
import styles from './BuildTypeChangesWidgetSettings.css'

const BuildTypeChangesWidgetSettings = () => {
	return (
		<WidgetSettings
			title="Changes Widget Settings"
			description="Widget support: egor.porsev@jetbrains.com"
			headerClassName={styles.settingsHeader}
		>
			<Section last>
				<Field label="Build Configuration" className={styles.buildConfigurationField}>
					<BuildTypeChangesWidgetBuildTypeSelector />
				</Field>
				<Field>
					<BranchWidgetOptionSelector className={styles.branchSelect} />
				</Field>
			</Section>
		</WidgetSettings>
	)
}

export default BuildTypeChangesWidgetSettings
