// @flow strict
import type { LayoutState } from './layout.types'
import type { WidgetData } from '../widgets/widgets.types'

export type DashboardData = {|
	layout: LayoutState;
	widgets: WidgetData[];
|}
