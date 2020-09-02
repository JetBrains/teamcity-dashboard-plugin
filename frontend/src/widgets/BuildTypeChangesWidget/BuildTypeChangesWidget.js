// @flow strict
import React, { useMemo } from 'react'
import WidgetBody from '../../components/WidgetBody/WidgetBody'
import BuildTypeChanges from '../../features/changes/components/BuildTypeChanges/BuildTypeChanges'
import BranchWidgetOptionSelector from './components/BranchWidgetOptionSelector/BranchWidgetOptionSelector'
import { useBranchLocatorOption, useBuildTypeIdOption } from './options/hooks'
import styles from './BuildTypeChangesWidget.css'
import GoToSettingsMessage from '../../features/widgets/components/GoToSettingsMessage/GoToSettingsMessage'

const BuildTypeChangesWidget = () => {
	const [buildTypeId] = useBuildTypeIdOption()
	const [branch] = useBranchLocatorOption()

	const inBodyOptions: Array<React$Node> = useMemo(
		(): Array<React$Node> => [
			<BranchWidgetOptionSelector
				key={0}
				className={styles.branchSelect}
			/>,
		],
		[]
	)

	return buildTypeId !== null && buildTypeId !== undefined ? (
		<WidgetBody
			options={inBodyOptions}
			className={styles.body}
			optionsClassName={styles.options}
		>
			<BuildTypeChanges buildTypeId={buildTypeId} branch={branch} />
		</WidgetBody>
	) : (
		<GoToSettingsMessage message="Please select a build configuration" />
	)
}

export default BuildTypeChangesWidget
