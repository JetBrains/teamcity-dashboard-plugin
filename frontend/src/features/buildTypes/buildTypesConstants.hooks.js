// @flow strict
import { useEffect } from 'react'
import type {
	BuildTypeConstants,
	BuildTypeId,
} from './buildTypesConstants.types'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchConstantsForSingleBuildType,
	selectBuildTypeConstantsById,
} from './buildTypesConstants.slice'

export const useBuildTypeConstants = (
	buildTypeId: ?BuildTypeId
): ?BuildTypeConstants => {
	const dispatch = useDispatch()
	useEffect(() => {
		if (buildTypeId !== null && buildTypeId !== undefined) {
			dispatch(fetchConstantsForSingleBuildType(buildTypeId))
		}
	}, [buildTypeId, dispatch])
	return useSelector((state) =>
		selectBuildTypeConstantsById(state, buildTypeId ?? '')
	)
}
