// @flow strict

import { useThisWidgetOption } from '../../../features/widgets/widgets.hooks'

const useShowOnlyDefaultBranchOption = (): [boolean, (boolean) => void] =>
	useThisWidgetOption('showOnlyDefaultBranch', true)

export default useShowOnlyDefaultBranchOption
