// @flow strict
import App from './App'

const dashboardTab = document.querySelector('#app')
if (dashboardTab !== null) {
	window.ReactUI.renderConnected(dashboardTab, App)
}
