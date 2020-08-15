// @flow strict
import React from 'react'
import collapseProviderContext from './CollapseProvider.context'

interface Properties {
	children: React$Node[],
	isExpanded: boolean,
}

const CollapseProvider = ({ children, isExpanded }: Properties) => {

	return (
		<collapseProviderContext.Provider value={isExpanded}>
			{children}
		</collapseProviderContext.Provider>
	)
}

export default CollapseProvider
