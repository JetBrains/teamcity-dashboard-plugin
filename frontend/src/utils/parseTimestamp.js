// @flow strict

export const parseTimestamp = (timestamp: string): Date => {
	const beautifulTimestamp = `${timestamp.slice(0, 4)}-${timestamp.slice(
		4,
		6
	)}-${timestamp.slice(6, 8)}T${timestamp.slice(9, 11)}:${timestamp.slice(
		11,
		13
	)}:${timestamp.slice(13, 15)}+${timestamp.slice(16, 18)}:${timestamp.slice(
		18,
		20
	)}`
	return new Date(beautifulTimestamp)
}
