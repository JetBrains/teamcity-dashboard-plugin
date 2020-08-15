// @flow strict
import React, { useCallback } from 'react'
import {
	useBranchLocatorOption,
	useBranchLocatorWidgetOption, useBuildTypeIdOption,
	useBuildTypeIdWidgetOption,
} from './hooks'
import TC from '@teamcity/react-api'
import type { WidgetId } from '../../../features/widgets/widgets.types'

const { BranchSelect } = TC.Components


const BuildTypeChangesWidgetBranchOptionSelector = () => {
	const [branchSelector, setBranchSelector] = useBranchLocatorOption()
	const [buildTypeId] = useBuildTypeIdOption()

	const onSelect = useCallback(
		(receivedBranch?: {
			name?: string,
			default?: boolean,
			groupFlag?: boolean,
			internalName?: string,
			...
		}) => {
			console.log('branch', receivedBranch)
			if (receivedBranch) {
				if (receivedBranch.groupFlag === true) {
					setBranchSelector({
						isGroup: true,
						groupInternalName: receivedBranch.internalName,
					})
				} else {
					setBranchSelector({
						name: receivedBranch.name,
						default: receivedBranch.default,
					})
				}
			} else {
				setBranchSelector({
					default: 'any',
				})
			}
		},
		[setBranchSelector]
	)

	return buildTypeId !== null && buildTypeId !== undefined ? (
		<BranchSelect
			projectOrBuildTypeNode={{ nodeType: 'bt', id: buildTypeId }}
			selected={branchSelector}
			onSelect={onSelect}
		/>
	) : (
		<span>Branch selector requires selected buildType</span>
	)
}

export default BuildTypeChangesWidgetBranchOptionSelector
