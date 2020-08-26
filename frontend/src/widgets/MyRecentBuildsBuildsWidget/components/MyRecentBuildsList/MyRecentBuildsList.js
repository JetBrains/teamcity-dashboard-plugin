// @flow strict
import React from 'react'
import type { Build } from '../../../../features/builds/builds.types'

import TC from '@teamcity/react-api'
import MyRecentBuildsListItem from './MyRecentBuildsListItem/MyRecentBuildsListItem'

const { BuildsList } = TC.Components


const shouldRenderBuildTypeHeader = (
	build: Build,
	index: number,
	builds: Build[]
) => index === 0 || build.buildType !== builds[index - 1].buildType

const shouldRenderDivider = (build: Build, index: number, builds: Build[]) =>
	shouldRenderBuildTypeHeader(build, index, builds) && index !== 0

const MyRecentBuildsList = () => {
	return (
		<BuildsList
			locator="defaultFilter:false,user:current"
			renderEachBuild={(build: Build, index: number, builds: Build[]) => (
				<MyRecentBuildsListItem
					withBuildTypeHeader={shouldRenderBuildTypeHeader(
						build,
						index,
						builds
					)}
					withDivider={shouldRenderDivider(build, index, builds)}
					buildId={build.id}
				/>
			)}
		/>
	)
}

export default MyRecentBuildsList
