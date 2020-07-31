// @flow strict
import type { Investigation, InvestigationId } from '../../store/slices/investigationsSlice'
import { useSelector } from 'react-redux'
import { selectInvestigationById } from '../../store/slices/investigationsSlice'

const useInvestigation = (investigationId: InvestigationId): ?Investigation => {
	return useSelector(state => selectInvestigationById(state, investigationId))
}

export default useInvestigation
