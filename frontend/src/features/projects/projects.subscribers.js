// @flow strict
import TC from '@teamcity/react-api'

export const subscribeOnAllProjectEvents: (
	projectInternalId: string,
	handler: () => void
) => () => void = TC.subscribers.subscribeOnAllProjectEvents
