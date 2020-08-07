// @flow strict

import useBooleanWidgetOption from '../useBooleanWidgetOption'

const useInvestigationsWidgetShowOnlyDefaultBranchOption = (
	widgetId: string
): [boolean, (boolean) => void] => {
	return useBooleanWidgetOption(widgetId, 'showOnlyDefaultBranch', true)
}

export default useInvestigationsWidgetShowOnlyDefaultBranchOption
