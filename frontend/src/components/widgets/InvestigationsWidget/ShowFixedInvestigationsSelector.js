// @flow strict
import React from 'react'
import Checkbox from '@jetbrains/ring-ui/components/checkbox/checkbox'
import useWidgetData from '../../../hooks/useWidgetData'

interface Properties {
	widgetId: string;
}

// $FlowFixMe
const ShowFixedInvestigationsSelector = React.memo(({ widgetId }: Properties) => {
	const [widgetData, setWidgetData] = useWidgetData(widgetId)
	const onChange = () => {
		setWidgetData({
			...widgetData,
			data: {
				...widgetData.data,
				showFixed:
					widgetData.data.showFixed === 'true' ? 'false' : 'true',
			},
		})
	}
	return <Checkbox label="Show fixed" onChange={onChange} defaultChecked={widgetData.data.showFixed === 'true'}/>
})

ShowFixedInvestigationsSelector.displayName = 'ShowFixedInvestigationsSelector'

export default ShowFixedInvestigationsSelector
