// @flow strict
import React from 'react'
import type { WidgetId } from '../../widgets.types'

const thisWidgetIdContext = React.createContext<?WidgetId>()

export default thisWidgetIdContext
