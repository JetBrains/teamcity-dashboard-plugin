// @flow strict
import { useWidgetOption } from '../../../features/widgets/widgets.hooks'

const useInvestigationsWidgetShowFixedOption = (
	widgetId: string
): [boolean, (boolean) => void] => {
	return useWidgetOption(widgetId, 'showFixed', false)
}

export default useInvestigationsWidgetShowFixedOption
