// @flow strict
import TC from '@teamcity/react-api'
import type {
	Build,
	BuildId,
	BuildStatus,
	BuildStatusType,
} from './builds.types'

export const useBuild: (buildId: BuildId) => ?Build = TC.hooks.useBuild

export const useSubscribeOnBuildsTriggeredByCurrentUser: (
	count: number
) => void = TC.hooks.useSubscribeOnBuildsTriggeredByCurrentUser

export const useBuildStatusType: (BuildId) => BuildStatusType =
	TC.hooks.useBuildStatusType

export const useRunningBuildLeftSeconds: (BuildId) => ?number =
	TC.hooks.useRunningBuildLeftSeconds

export const useRunningBuildProgress: (BuildId) => ?number =
	TC.hooks.useRunningBuildProgress

export const useBuildStatusLink: (BuildId) => {
	statusText: string,
	icon: string,
	statusType: BuildStatus,
	href: string,
	...
} = TC.hooks.useBuildStatusLink
