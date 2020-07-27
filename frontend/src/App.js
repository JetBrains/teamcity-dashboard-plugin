// @flow
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Dashboard from './components/Dashboard'

const App = () => {
	return (
		<Provider store={store}>
			<Dashboard />
		</Provider>
	)
}

export default App
