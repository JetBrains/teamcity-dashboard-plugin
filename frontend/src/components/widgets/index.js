// @flow strict
import React, { useCallback, memo } from 'react'
import useWidgetData from '../../hooks/useWidgetData'
import TextWidget from './TextWidget'
import NumberWidget from './NumberWidget'
import Island, {
	Header,
	Content,
} from '@jetbrains/ring-ui/components/island/island'

interface Properties {
	id: string;
}

const Widget = memo<Properties>(({ id }: Properties) => {
	const [widgetData, setWidgetData, removeWidget] = useWidgetData(id)
	const { type, data } = widgetData
	const setValue = useCallback(
		(newValue: string) =>
			setWidgetData({
				id,
				type,
				data: {
					...data,
					value: newValue,
				},
			}),
		[data, id, setWidgetData, type]
	)
	let widget
	if (type === 'text') {
		console.log('text widget rendered')
		widget = <TextWidget value={data.value} setValue={setValue} />
	}

	if (type === 'number') {
		console.log('number widget rendered')
		widget = <NumberWidget value={data.value} setValue={setValue} />
	}
	return (
		<Island style={{ width: '100%', height: '100%' }}>
			<Header border className="draggable-handle">
				Widget
				<button onClick={removeWidget}>X</button>
			</Header>
			<Content>{widget}</Content>
		</Island>
	)
})

Widget.displayName = 'WidgetWrapper'

export default Widget
