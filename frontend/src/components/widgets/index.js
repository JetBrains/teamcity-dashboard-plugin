import React, {useCallback} from 'react';
import useWidgetData from '../../hooks/useWidgetData';
import TextWidget from './TextWidget';
import NumberWidget from './NumberWidget';

interface Props {
	id: string;
}

const Widget = ({id}: Props) => {
	const [widgetData, setWidgetData] = useWidgetData(id);
	const {type, data} = widgetData;
	const setValue = useCallback((newValue: string) => setWidgetData({
		id,
		type,
		data: {
			...data,
			value: newValue
		}
	}), [data, id, setWidgetData, type]);
	if (type === 'text') {
		console.log('text widget rendered');
		return <TextWidget value={data.value} setValue={setValue}/>;
	}

	if (type === 'number') {
		console.log('number widget rendered');
		return <NumberWidget value={data.value} setValue={setValue}/>;
	}

	return <span>Element not supported</span>;
};

export default Widget;
