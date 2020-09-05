// @flow strict
import React from 'react'
import type { WidgetType } from '../../widgets.types'

const ThisWidgetTypeContext = React.createContext<?WidgetType>()

export default ThisWidgetTypeContext
