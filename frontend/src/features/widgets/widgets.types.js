// @flow strict
import type { Json, Record } from '../../commontypes'

export type WidgetId = string

export type InvestigationsWidgetSortByOption = 'time' | 'name'

export type InvestigationsWidgetData = {|
	id: string,
	type: 'investigationsWidget',
	data: {|
		sortBy?: InvestigationsWidgetSortByOption,
		showFixed?: 'true' | 'false',
		showOnlyDefaultBranch?: 'true' | 'false',
	|},
|}

export type BuildTypeChangesWidgetData = {|
	id: string,
	type: 'buildTypeChangesWidget',
	data: {|
		branchName?: string,
	|},
|}

export type WidgetOptions = {|
	sortBy?: InvestigationsWidgetSortByOption,
	showFixed?: 'true' | 'false',
	showOnlyDefaultBranch?: 'true' | 'false',
|}
export type WidgetData = InvestigationsWidgetData | BuildTypeChangesWidgetData
export type WidgetType = $PropertyType<WidgetType, 'type'>
export type WidgetDataWithoutId = $Diff<WidgetData, {| id: string |}>

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

