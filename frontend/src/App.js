// @flow strict
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Dashboard from './components/Dashboard'
import TC from '@teamcity/react-api'

const App = () => {
	const buildTypes = TC.hooks.useBuildTypes()
	console.log('BUILDTYPES', buildTypes)
	TC.hooks.useProjects()
	return (
		<div className="dashboard-root">
			<Provider store={store}>
				<Dashboard />
			</Provider>
		</div>
	)
}

export default App
