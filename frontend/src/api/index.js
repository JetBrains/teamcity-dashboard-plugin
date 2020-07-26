// @flow

import type {DashboardData} from '../commontypes';

const initialDashboardData: DashboardData = {
	layout: [
		{w: 2, h: 3, x: 1, y: 1, i: '0'},
		{w: 5, h: 4, x: 5, y: 5, i: '1'}
	],
	widgets: [
		{id: '0', type: 'text', data: {value: 'actual value'}},
		{id: '1', type: 'number', data: {value: '1'}}
	]
};

let savedData = initialDashboardData;

// TODO: should fetch data from server
export function getDashboardDataFromServer(): Promise<DashboardData> {
	console.log('Trying to fetch from server');
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() > 0) {
				console.log('Fetched from server', savedData);
				resolve(savedData);
			} else {
				console.log('Couldn\'t fetch from server');
				reject(new Error('failed'));
			}
		}, 1000);
	});
}

// TODO: should post data to server
export function postDashboardDataToServer(data: DashboardData): Promise<void> {
	// Console.log("Trying to post to server")
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() > 0) {
				savedData = data;
				console.log('Posted to server', savedData);
				resolve();
			} else {
				console.log('Couldn\'t post to the server');
				reject(new Error('Failed'));
			}
		}, 1000);
	});
}
