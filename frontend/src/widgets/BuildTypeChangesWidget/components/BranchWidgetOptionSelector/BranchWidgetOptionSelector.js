// @flow strict
import React, { useCallback, useMemo } from 'react'
import {
	useBranchLocatorOption,
	useBuildTypeIdOption,
} from '../../options/hooks'
import TC from '@teamcity/react-api'

import styles from './BranchWidgetOptionSelector.css'

const { BranchSelect } = TC.Components

const BranchWidgetOptionSelector = () => {
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
			if (receivedBranch) {
				if (receivedBranch.groupFlag === true) {
					setBranchSelector({
						name: receivedBranch.name,
						default: receivedBranch.default,
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

	// this is a trick to make <All Branches> work with my Branches locators
	const selected = useMemo(
		() => (branchSelector?.default === 'any' ? undefined : branchSelector),
		[branchSelector]
	)

	return buildTypeId !== null && buildTypeId !== undefined ? (
		<BranchSelect
			projectOrBuildTypeNode={{ nodeType: 'bt', id: buildTypeId }}
			selected={selected}
			className={styles.BranchWidgetOptionSelector}
			minimalistic
			onSelect={onSelect}
		/>
	) : (
		<span>Branch selector requires selected buildType</span>
	)
}

export default BranchWidgetOptionSelector
