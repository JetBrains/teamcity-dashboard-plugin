// @flow strict
import React, { Fragment, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectAllDistinctWidgetTypes } from '../../../widgets/widgets.slice'
import WidgetTopLevelComponentWrapper from './WidgetTopLevelComponentWrapper'
import type { WidgetType } from '../../../widgets/widgets.types'

const WidgetTopLevelComponents = () => {
	const types: WidgetType[] = useSelector(selectAllDistinctWidgetTypes)

	const components: (?React$Node)[] = useMemo(
		() =>
			types.map(
				(type: WidgetType) =>
					(
						<WidgetTopLevelComponentWrapper
							key={type}
							type={type}
						/>
					) ?? <Fragment />
			),
		[types]
	)
	return <div>{components}</div>
}

export default WidgetTopLevelComponents
