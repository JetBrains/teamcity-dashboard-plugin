// @flow strict
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Dashboard from './features/dashboard/components/Dashboard'

const App = () => {
	return (
		<div className="dashboard-root">
			<Provider store={store}>
				<Dashboard />
			</Provider>
		</div>
	)
}

export default App
