// @flow strict
import App from './App';
import store from './store';
import {fetchDashboardData} from './store/slices/fetchingDashboardData';
// Import 'react-grid-layout/css/styles.css';
// import 'react-resizable/css/styles.css';

store.dispatch(fetchDashboardData());

// TODO: ReactUI undef
const dashboardTab = document.querySelector('#app');
if (dashboardTab !== null) {
	// eslint-disable-next-line no-undef
	console.log(ReactUI.renderConnected);
	// eslint-disable-next-line no-undef
	ReactUI.renderConnected(dashboardTab, App);
}
