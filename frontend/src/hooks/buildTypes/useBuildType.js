// @flow strict
import type { BuildType, BuildTypeId } from '../../store/slices/buildTypesSlice'
import { selectBuildTypeById } from '../../store/slices/buildTypesSlice'
import { useSelector } from 'react-redux'

const useBuildType = (buildTypeId: BuildTypeId): ?BuildType => {
	return useSelector((state) => selectBuildTypeById(state, buildTypeId))
}

export default useBuildType
