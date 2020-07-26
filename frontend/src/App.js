// @flow
import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Grid from './components/Grid';

const App = () => {
	return <Provider store={store}><Grid/></Provider>;
};

export default App;
