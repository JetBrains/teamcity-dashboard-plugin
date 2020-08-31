// @flow strict
import React, { useCallback } from 'react'
import Button from '@jetbrains/ring-ui/components/button/button'
import ButtonGroup from '@jetbrains/ring-ui/components/button-group/button-group'
import useSortByOption from '../../../hooks/useSortByOption'

type Properties = {|
	className?: ?string,
|}

const SortByButtonGroup = ({ className }: Properties) => {
	const [sortBy, setSortBy] = useSortByOption()

	const setSortByTime = useCallback(() => setSortBy('time'), [setSortBy])
	const setSortByName = useCallback(() => setSortBy('name'), [setSortBy])

	return (
		<ButtonGroup className={className}>
			<Button active={sortBy === 'time'} onClick={setSortByTime}>
				Sort by time
			</Button>
			<Button active={sortBy === 'name'} onClick={setSortByName}>
				by name
			</Button>
		</ButtonGroup>
	)
}

export default SortByButtonGroup
