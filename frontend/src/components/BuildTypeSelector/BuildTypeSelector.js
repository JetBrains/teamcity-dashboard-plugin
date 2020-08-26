// @flow strict
import React, { useCallback, useMemo } from 'react'
import TC from '@teamcity/react-api'
import type { BuildTypeId } from '../../features/buildTypes/buildTypes.types'
import { usePathToBuildType } from '../../features/buildTypes/buildTypes.hooks'

const { ProjectBuildtypeDropdown } = TC.Components
const baseUri = TC.base_uri

interface Properties {
	selectedBuildTypeId: ?BuildTypeId;
	onSelect: (BuildTypeId) => void;
}

const init = (element) => {
	if (typeof element.loadData === 'function') {
		element.loadData()
	}
}

const BuildTypeSelector = ({ selectedBuildTypeId, onSelect }: Properties) => {
	const fullPath = usePathToBuildType(selectedBuildTypeId ?? '')

	const selected = useMemo(
		() =>
			selectedBuildTypeId !== null && selectedBuildTypeId !== undefined
				? {
						id: selectedBuildTypeId,
						nodeType: 'bt',
						fullPath:
							fullPath.length !== 0
								? fullPath.map((item) => item.name).join(' :: ')
								: 'Loading...',
				  }
				: undefined,
		[selectedBuildTypeId, fullPath]
	)

	const onNewBuildTypeSelected = useCallback(
		({ detail }) => {
			onSelect(detail.id)
		},
		[onSelect]
	)

	return (
		<ProjectBuildtypeDropdown
			props={{
				selectableNodeTypes: ['bt'],
				server: baseUri,
				settings: {
					quickNavigation: false,
					editMode: false,
					source: 'global',
					baseUri: baseUri,
					currentServer: baseUri,
					hideFirstServerHeader: true,
				},
				expandAll: true,
				removeEmptyProjects: true,
				alwaysForceUpdate: true,
				selected: selected,
			}}
			handlers={{
				'buildtype-changed': onNewBuildTypeSelected,
			}}
			init={init}
		/>
	)
}

export default BuildTypeSelector
