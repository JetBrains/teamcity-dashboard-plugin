// @flow strict
import TC from '@teamcity/react-api'

export const subscribeOnAllBuildTypeEvents: (
	buildTypeInternalId: string,
	handler: () => void,
	firstCallHandler?: boolean,
) => () => void = TC.subscribers.subscribeOnAllBuildTypeEvents
