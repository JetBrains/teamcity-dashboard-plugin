// @flow strict
import React from 'react'
import { useBuildTypeIdOption } from './hooks'
import BuildTypeSelector from '../../../components/BuildTypeSelector/BuildTypeSelector'


const BuildTypeChangesWidgetBuildTypeSelector = () => {
	const [buildTypeId, setBuildTypeId] = useBuildTypeIdOption()
	return (
		<BuildTypeSelector
			selectedBuildTypeId={buildTypeId}
			onSelect={setBuildTypeId}
		/>
	)
}

export default BuildTypeChangesWidgetBuildTypeSelector
