// @flow strict
import App from './App'
import store from './store'
import { fetchDashboardData } from './store/slices/fetchingDashboardData'
import { fetchProjects } from './store/slices/projectsSlice'
import { fetchBuildTypes } from './store/slices/buildTypesSlice'
// Import 'react-grid-layout/css/styles.css';
// import 'react-resizable/css/styles.css';

store.dispatch(fetchDashboardData())
store.dispatch(fetchProjects())
store.dispatch(fetchBuildTypes())

// TODO: ReactUI undef
const dashboardTab = document.querySelector('#app')
if (dashboardTab !== null) {
	// eslint-disable-next-line no-undef
	console.log(ReactUI.renderConnected)
	// eslint-disable-next-line no-undef
	ReactUI.renderConnected(dashboardTab, App)
}
