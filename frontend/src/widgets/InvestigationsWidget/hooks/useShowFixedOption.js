// @flow strict

import { useThisWidgetOption } from '../../../features/widgets/widgets.hooks'

const useShowFixedOption = (): [boolean, (boolean) => void] =>
	useThisWidgetOption('showFixed', false)

export default useShowFixedOption
