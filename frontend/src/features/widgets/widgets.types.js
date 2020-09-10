// @flow strict
import type { Json } from '../../commontypes'
import type { BuildTypeId } from '../buildTypes/buildTypes.types'

export type WidgetId = string

export type InvestigationsWidgetSortByOption = 'time' | 'name'

export type MyRecentBuildsWidgetData = {|
	id: WidgetId,
	type: 'myRecentBuildsWidget',
	data: { ... },
|}

export type AbstractWidgetData<Type: string, Data: Json> = {|
	id: string,
	type: Type,
	data: Data,
|}

type InvestigationsWidgetDataData = {
	sortBy?: InvestigationsWidgetSortByOption,
	showFixed?: boolean,
	showOnlyDefaultBranch?: boolean,
	...
}

type BuildTypeChangesWidgetDataData = {
	branchName?: string,
	buildTypeId?: BuildTypeId,
	...
}

type MyRecentBuildsWidgetDataData = { ... }

export type WidgetData =
	| AbstractWidgetData<'investigationsWidget', InvestigationsWidgetDataData>
	| AbstractWidgetData<
			'buildTypeChangesWidget',
			BuildTypeChangesWidgetDataData
	  >
	| AbstractWidgetData<'myRecentBuildsWidget', MyRecentBuildsWidgetDataData>

export type WidgetDataData = $PropertyType<WidgetData, 'data'>

export type WidgetType = $PropertyType<WidgetData, 'type'>

export type WidgetsState = {|
	ids: WidgetId[],
	entities: {|
		[id: WidgetId]: AbstractWidgetData<*, *>,
	|},
	widgetWithOpenedSettings: ?string,
|}

export type SetWidgetPropertyActionPayload<T: Json> = {|
	id: WidgetId,
	propertyName: string,
	propertyValue: T,
|}
