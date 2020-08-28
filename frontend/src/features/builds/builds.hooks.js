// @flow strict
import TC from '@teamcity/react-api'
import type { Build, BuildId } from './builds.types'

export const useBuild: (buildId: BuildId) => ?Build = TC.hooks.useBuild

export const useSubscribeOnBuildsTriggeredByCurrentUser: (
	count: number
) => void = TC.hooks.useSubscribeOnBuildsTriggeredByCurrentUser

export const useRunningBuildLeftSeconds: (BuildId) => ?number =
	TC.hooks.useRunningBuildLeftSeconds

export const useRunningBuildProgress: (BuildId) => ?number =
	TC.hooks.useRunningBuildProgress
