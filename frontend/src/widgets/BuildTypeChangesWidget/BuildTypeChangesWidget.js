// @flow strict
import React, { useMemo, useState } from 'react'
import WidgetBody from '../../components/WidgetBody/WidgetBody'
import WidgetIsland from '../../components/WidgetIsland/WidgetIsland'
import BuildTypeChanges from '../../components/BuildTypeChanges/BuildTypeChanges'
import WidgetEllipsisOptions from '../../components/WidgetEllipsisOptions/WidgetEllipsisOptions'
import InvestigationsSortingOptionSelector from '../InvestigationsWidget/options/InvestigationsSortingOptionSelector'
import InvestigationsShowFixedOptionsSelector from '../InvestigationsWidget/options/InvestigationsShowFixedOptionSelector'
import TC from '@teamcity/react-api'
import BuildTypeChangesWidgetBranchOptionSelector from './options/BuildTypeChangesWidgetBranchOptionSelector'
import {
	useAreAllExpanded, useBranchLocatorOption,
	useBranchLocatorWidgetOption, useBuildTypeIdOption,
	useBuildTypeIdWidgetOption,
} from './options/hooks'
import BuildTypeChangesWidgetBuildTypeSelector from './options/BuildTypeChangesWidgetBuildTypeSelector'
import useBuildType from '../../hooks/TC/useBuildType'
import useToggle from '../../hooks/basic/useToggle'
import button from '@jetbrains/ring-ui/components/button/button'
import CollapseProvider from '../../components/CollapseProvider/CollapseProvider'
import useToggleState from '../../hooks/basic/useToggleState'
import type { WidgetId } from '../../features/widgets/widgets.types'
import { useThisWidgetId } from '../../features/widgets/widgets.hooks'


const BuildTypeChangesWidget = () => {
	const [branch] = useBranchLocatorOption()

	const [buildTypeId] = useBuildTypeIdOption()

	const [areAllExpanded, setAreAllExpanded] = useAreAllExpanded()
	const toggleAreAllExpanded = useToggle(areAllExpanded, setAreAllExpanded)


	const inBodyOptions: Array<React$Node> = useMemo(
		(): Array<React$Node> => [
			<BuildTypeChangesWidgetBranchOptionSelector
				key={0}
			/>,
			<button key={1} onClick={toggleAreAllExpanded}>
				{areAllExpanded ? 'Collapse All' : 'Expand All'}
			</button>,
		],
		[areAllExpanded, toggleAreAllExpanded]
	)

	return (
		<WidgetBody options={inBodyOptions}>
			{buildTypeId !== null && buildTypeId !== undefined ? (
				<BuildTypeChanges buildTypeId={buildTypeId} branch={branch} />
			) : (
				<span>No build type selected</span>
			)}
		</WidgetBody>
	)

	// return (
	// 	<WidgetIsland
	// 		title={<span>BuildTypeChangesWidget</span>}
	// 		headerOptions={headerOptions}
	// 	>
	// 		<WidgetBody options={inBodyOptions}>
	// 			<CollapseProvider isExpanded={areAllExpanded}>
	// 				{buildTypeId !== null && buildTypeId !== undefined ? (
	// 					<BuildTypeChanges
	// 						buildTypeId={buildTypeId}
	// 						branch={branch}
	// 					/>
	// 				) : (
	// 					<span>No build type selected</span>
	// 				)}
	// 			</CollapseProvider>
	// 			{/*<BuildChanges buildId={buildId} />*/}
	// 		</WidgetBody>
	// 	</WidgetIsland>
	// )
}

export default BuildTypeChangesWidget
