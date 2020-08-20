// @flow strict
import React, { useMemo } from 'react'
import WidgetBody from '../../components/WidgetBody/WidgetBody'
import BuildTypeChanges from '../../components/BuildTypeChanges/BuildTypeChanges'
import BranchWidgetOptionSelector from './components/BranchWidgetOptionSelector/BranchWidgetOptionSelector'
import {
	useBranchLocatorOption,
	useBuildTypeIdOption,
} from './options/hooks'
import styles from './BuildTypeChangesWidget.css'

const BuildTypeChangesWidget = () => {
	const [branch] = useBranchLocatorOption()

	const [buildTypeId] = useBuildTypeIdOption()

	const inBodyOptions: Array<React$Node> = useMemo(
		(): Array<React$Node> => [<BranchWidgetOptionSelector key={0} />],
		[]
	)

	return (
		<WidgetBody
			options={inBodyOptions}
			className={styles.buildTypeChangesWidgetBody}
			optionsClassName={styles.buildTypeChangesOptions}
		>
			{buildTypeId !== null && buildTypeId !== undefined ? (
				<BuildTypeChanges buildTypeId={buildTypeId} branch={branch} />
			) : (
				<span>No build type selected</span>
			)}
		</WidgetBody>
	)
}

export default BuildTypeChangesWidget
