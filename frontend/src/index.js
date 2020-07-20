/* eslint-disable */
import React from 'react';
import Button from '@jetbrains/ring-ui/components/button/button';

import App from './App.js';

const dashboardTab = document.querySelector('#app');
if (dashboardTab !== null) {
	console.log(ReactUI.renderConnected);
	ReactUI.renderConnected(dashboardTab, App);
}
