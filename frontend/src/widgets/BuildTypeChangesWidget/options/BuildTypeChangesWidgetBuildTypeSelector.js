// @flow strict
import React, { useMemo, useCallback } from 'react'
import TC from '@teamcity/react-api'
import { useBuildTypeIdOption, useBuildTypeIdWidgetOption } from './hooks'
import useBuildType from '../../../hooks/TC/useBuildType'
import usePathToProjectOrBuildType from '../../../hooks/TC/usePathToProjectOrBuildType'
import BuildTypeSelector from '../../../components/BuildTypeSelector/BuildTypeSelector'
import type { WidgetId } from '../../../features/widgets/widgets.types'


const BuildTypeChangesWidgetBuildTypeSelector = () => {
	const [buildTypeId, setBuildTypeId] = useBuildTypeIdOption()
	return (
		<BuildTypeSelector
			selectedBuildTypeId={buildTypeId}
			onSelect={setBuildTypeId}
		/>
	)
}

// const BuildTypeChangesWidgetBuildTypeSelector = ({ widgetId }: Properties) => {
// 	const [buildTypeId, setBuildTypeId] = useBuildTypeIdWidgetOption(widgetId)
//
// 	const fullPath = usePathToProjectOrBuildType('buildType', buildTypeId ?? '')
//
// 	const selected = useMemo(
// 		() =>
// 			buildTypeId !== null && buildTypeId !== undefined
// 				? {
// 						id: buildTypeId,
// 						nodeType: 'bt',
// 						fullPath:
// 							fullPath !== null && fullPath !== undefined
// 								? fullPath.map((item) => item.name).join(' :: ')
// 								: 'Loading...',
// 				  }
// 				: undefined,
// 		[buildTypeId, fullPath]
// 	)
//
// 	const onSelect = useCallback(
// 		({ detail }) => {
// 			setBuildTypeId(detail.id)
// 		},
// 		[setBuildTypeId]
// 	)
//
// 	return (
// 		<ProjectBuildtypeDropdown
// 			props={{
// 				selectableNodeTypes: ['bt'],
// 				server: baseUri,
// 				settings: {
// 					quickNavigation: false,
// 					editMode: false,
// 					source: 'global',
// 					baseUri: baseUri,
// 					currentServer: baseUri,
// 					hideFirstServerHeader: true,
// 				},
// 				expandAll: true,
// 				removeEmptyProjects: true,
// 				alwaysForceUpdate: true,
// 				selected: selected,
// 			}}
// 			handlers={{
// 				'buildtype-changed': onSelect,
// 			}}
// 			init={init}
// 		/>
// 	)
// }

export default BuildTypeChangesWidgetBuildTypeSelector
