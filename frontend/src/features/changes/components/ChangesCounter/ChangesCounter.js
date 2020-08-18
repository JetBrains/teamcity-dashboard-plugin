// @flow strict
import React from 'react'
import { useChangesIdsByLocator } from '../../changes.hooks'
import type { ChangesLocator } from '../../changes.locator'

interface Properties {
	locator: ChangesLocator;
}

const ChangesCounter = ({ locator }: Properties) => {
	const [changesIds, status] = useChangesIdsByLocator(locator)
	const count = changesIds.length
	return status === 'loading' && changesIds.length === 0 ? (
		<span>Loading...</span>
	) : (
		<span>Changes({count > 100 ? '100+' : count})</span>
	)
}

export default ChangesCounter
