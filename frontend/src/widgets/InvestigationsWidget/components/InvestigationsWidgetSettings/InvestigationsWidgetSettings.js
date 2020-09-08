// @flow strict
import React from 'react'
import WidgetSettings, { Section } from '../../../../features/widgets/components/WidgetSettings/WidgetSettings'
import ShowFixedToggle from './ShowFixedToggle/ShowFixedToggle'
import ShowOnlyDefaultBranchToggle from './ShowOnlyDefaultBranchToggle/ShowOnlyDefaultBranchToggle'
import SortByButtonGroup from './SortByButtonGroup/SortByButtonGroup'
import Field from '../../../../features/widgets/components/WidgetSettings/Field/Field'

import styles from './InvestigationsWidgetSettings.css'

const InvestigationsWidgetSettings = () => {
	return (
		<WidgetSettings
			title="My Investigations Widget Settings"
			description="Widget support: egor.porsev@jetbrains.com"
		>
			<Section>
				<Field>
					<ShowFixedToggle className={styles.toggleWithLabel} />
				</Field>
				<Field>
					<ShowOnlyDefaultBranchToggle
						className={styles.toggleWithLabel}
					/>
				</Field>
			</Section>
			<Section last>
				<Field>
					<SortByButtonGroup />
				</Field>
			</Section>

		</WidgetSettings>
	)
}

export default InvestigationsWidgetSettings
