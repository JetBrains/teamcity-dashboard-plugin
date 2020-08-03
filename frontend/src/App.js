// @flow
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Dashboard from './components/Dashboard'
import TC from '@teamcity/react-api'

const App = () => {
	TC.hooks.useBuildTypes()
	TC.hooks.useProjects()
	return (
		<Provider store={store}>
			<Dashboard />
		</Provider>
	)
}

export default App
