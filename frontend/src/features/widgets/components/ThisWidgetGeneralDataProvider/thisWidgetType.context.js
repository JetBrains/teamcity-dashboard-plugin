// @flow strict
import React from 'react'
import type { WidgetType } from '../../widgets.types'

const thisWidgetTypeContext = React.createContext<?WidgetType>()

export default thisWidgetTypeContext
