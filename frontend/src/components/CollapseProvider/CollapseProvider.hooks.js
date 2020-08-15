// @flow strict
import {useContext} from 'react'
import collapseProviderContext from './CollapseProvider.context'

export const useIsExpanded = (): boolean => {
	return useContext(collapseProviderContext)
}
