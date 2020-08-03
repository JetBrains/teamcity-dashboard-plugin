// @flow strict

import type {
	Investigation,
	InvestigationsVisibilityFilter,
} from '../../store/slices/investigationsSlice'
import useInvestigations from './useInvestigations'
import type { AsyncStatus } from '../../commontypes'

const useInvestigationsWithVisibilityFilter = (
	filter: InvestigationsVisibilityFilter
): [AsyncStatus, Investigation[]] => {
	const [status, investigations] = useInvestigations()
	const filtered = investigations.filter(
		(investigation) =>
			(investigation.state !== 'FIXED' || filter.showFixed) &&
			investigation.target.type === 'buildType'
	)
	return [status, filtered]
}

export default useInvestigationsWithVisibilityFilter
