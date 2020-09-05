// @flow strict
import type { Json, Record } from '../../commontypes'

export type WidgetId = string

export type InvestigationsWidgetSortByOption = 'time' | 'name'

export type InvestigationsWidgetData = {|
	id: WidgetId,
	type: 'investigationsWidget',
	data: {
		sortBy?: InvestigationsWidgetSortByOption,
		showFixed?: boolean,
		showOnlyDefaultBranch?: boolean,
		...
	},
|}

export type BuildTypeChangesWidgetData = {|
	id: WidgetId,
	type: 'buildTypeChangesWidget',
	data: {
		branchName?: string,
		...
	},
|}

export type MyRecentBuildsWidgetData = {|
	id: WidgetId,
	type: 'myRecentBuildsWidget',
	data: { ... },
|}

export type WidgetData = InvestigationsWidgetData | BuildTypeChangesWidgetData | MyRecentBuildsWidgetData
export type WidgetType = $PropertyType<WidgetData, 'type'>
export type WidgetDataData = $PropertyType<WidgetData, 'data'>

export interface WidgetsState {
	ids: string[];
	entities: Record<string, WidgetData>;
	widgetWithOpenedSettings: ?string;
}

export type SetWidgetPropertyActionPayload<T : Json> = {|
	id: WidgetId,
	propertyName: string,
	propertyValue: T
|}

