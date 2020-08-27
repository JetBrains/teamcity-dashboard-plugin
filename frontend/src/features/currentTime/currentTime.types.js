// @flow strict

export type CurrentTimeState = {|
	currentTime: number,
	intervalId: ?number,
	subscribersCount: number,
|}
