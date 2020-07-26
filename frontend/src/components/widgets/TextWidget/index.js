import React from 'react';

interface Props {
	value: string;
	setValue: (newValue: string) => void;
}

const TextWidget = ({value, setValue}: Props) => {
	return <input type="text" value={value} style={{width: '100%'}} onChange={event => setValue(event.target.value)}/>;
};

export default TextWidget;
