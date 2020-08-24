// @flow strict
import layoutSliceReducer, { type Layout } from './slices/layoutSlice'
import { configureStore } from '@reduxjs/toolkit'
import widgetsSliceReducer from '../features/widgets/widgets.slice'
import fetchingDashboardDataSliceReducer from './slices/fetchingDashboardData'
import postingDashboardDataSliceReducer from './slices/postingDashboardData'
import investigationsSliceReducer from '../features/investigations/investigations.slice'
import { type AsyncState } from '../commontypes'
import changesSliceReducer, {
	type ChangesState,
} from '../features/changes/changes.slice'
import changesIdsByLocatorReducer from '../features/changes/changesIdsByLocator.slice'
import type { BuildTypeConstantsState } from '../features/buildTypes/buildTypesConstants.types'
import buildTypesConstantsSliceReducer from '../features/buildTypes/buildTypesConstants.slice'
import type { WidgetsState } from '../features/widgets/widgets.types'
import type { TopLevelWidgetsStateState } from '../features/widgets/topLevelWidgetsState.types'
import topLevelWidgetsStateSliceReducer from '../features/widgets/topLevelWidgetsState.slice'
import type { ChangesIdsByLocatorState } from '../features/changes/changesIdsByLocator.types'
import type { WidgetStateState } from '../features/widgets/widgetsState.types'
import widgetsStateSliceReducer from '../features/widgets/widgetsState.slice'
import type { InvestigationsState } from '../features/investigations/investigations.types'
import type { WidgetSettingsState } from '../features/widgets/widgetSettings.types'
import widgetSettingsSliceReducer from '../features/widgets/widgetSettings.slice'

export interface RootState {
	layout: Layout;
	widgets: WidgetsState;
	topLevelWidgetsState: TopLevelWidgetsStateState;
	fetchingDashboardData: AsyncState;
	postingDashboardData: AsyncState;
	investigations: InvestigationsState;
	changes: ChangesState;
	changesIdsByLocator: ChangesIdsByLocatorState;
	buildTypesConstants: BuildTypeConstantsState;
	widgetsState: WidgetStateState;
	widgetSettings: WidgetSettingsState;
}

const store = configureStore<RootState>({
	reducer: {
		layout: layoutSliceReducer,
		widgets: widgetsSliceReducer,
		fetchingDashboardData: fetchingDashboardDataSliceReducer,
		postingDashboardData: postingDashboardDataSliceReducer,
		investigations: investigationsSliceReducer,
		changes: changesSliceReducer,
		changesIdsByLocator: changesIdsByLocatorReducer,
		buildTypesConstants: buildTypesConstantsSliceReducer,
		topLevelWidgetsState: topLevelWidgetsStateSliceReducer,
		widgetsState: widgetsStateSliceReducer,
		widgetSettings: widgetSettingsSliceReducer,
	},
})

export default store
