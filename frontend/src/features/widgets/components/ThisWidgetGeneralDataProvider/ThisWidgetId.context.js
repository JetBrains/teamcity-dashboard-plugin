// @flow strict
import React from 'react'
import type { WidgetId } from '../../widgets.types'

const ThisWidgetIdContext = React.createContext<?WidgetId>()

export default ThisWidgetIdContext
