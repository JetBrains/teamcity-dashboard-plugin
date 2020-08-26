// @flow strict

import type { RootState } from '../../store'
import type { LayoutState } from './layout.types'

export const selectLayout = (state: RootState): LayoutState => state.layout
