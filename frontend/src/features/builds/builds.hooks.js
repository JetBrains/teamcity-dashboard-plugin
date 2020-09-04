// @flow strict
import TC from '@teamcity/react-api'
import type {
	Build,
	BuildId,
	BuildState,
	BuildStatus,
} from './builds.types'
import type { BuildTypeId } from '../buildTypes/buildTypes.types'

export const useBuild: (buildId: BuildId) => ?Build = TC.hooks.useBuild

export const useBuildState: (BuildId) => ?BuildState = TC.hooks.useBuildState

export const useIsBuildComposite: (BuildId) => boolean =
	TC.hooks.useIsBuildComposite

export const useBuildBuildTypeId: (BuildId) => ?BuildTypeId =
	TC.hooks.useBuildBuildTypeId

export const useSubscribeOnBuildsTriggeredByCurrentUser: (
	count: number
) => void = TC.hooks.useSubscribeOnBuildsTriggeredByCurrentUser

export const useBuildStatusType: (BuildId) => string =
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
