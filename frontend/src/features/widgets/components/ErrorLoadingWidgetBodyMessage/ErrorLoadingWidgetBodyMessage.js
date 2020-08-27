// @flow strict
import React from 'react'
import CenteredMessage from '../../../../components/CenteredMessage/CenteredMessage'

const ErrorLoadingWidgetBodyMessage = () => {
	return (
		<CenteredMessage
			textIcon={'๏̯̃๏'}
			text={
				'This widget is not supported. Try updating the page or removing the widget.'
			}
		/>
	)
}

export default ErrorLoadingWidgetBodyMessage
