// @flow strict
import App from './App'

// TODO: ReactUI undef
const dashboardTab = document.querySelector('#app')
if (dashboardTab !== null) {
	// eslint-disable-next-line no-undef
	ReactUI.renderConnected(dashboardTab, App)
}
