// @flow strict

import { useWidgetOption } from '../../../features/widgets/widgets.hooks'

const useInvestigationsWidgetShowOnlyDefaultBranchOption = (
	widgetId: string
): [boolean, (boolean) => void] => {
	return useWidgetOption(widgetId, 'showOnlyDefaultBranch', true)
}

export default useInvestigationsWidgetShowOnlyDefaultBranchOption
