// @flow strict
import React from 'react'
import type { Build } from '../../../../features/builds/builds.types'

import TC from '@teamcity/react-api'
import MyRecentBuildsListItem from './MyRecentBuildsListItem/MyRecentBuildsListItem'
import addLocatorCount from '../../../../utils/addLocatorCount'
import { useSubscribeOnBuildsTriggeredByCurrentUser } from '../../../../features/builds/builds.hooks'
import styles from './MyRecentBuildsList.css'

const { BuildsList } = TC.Components

const shouldRenderBuildTypeHeader = (
	build: Build,
	index: number,
	builds: Build[]
) => index === 0 || build.buildType !== builds[index - 1].buildType

const shouldRenderDivider = (build: Build, index: number, builds: Build[]) =>
	shouldRenderBuildTypeHeader(build, index, builds) && index !== 0

const MyRecentBuildsList = () => {
	useSubscribeOnBuildsTriggeredByCurrentUser(50)
	return (
		<ul className={styles.MyRecentBuildsList}>
			<BuildsList
				locator={addLocatorCount('defaultFilter:false,user:current', 50)}
				renderEachBuild={(build: Build, index: number, builds: Build[]) => (
					<MyRecentBuildsListItem
						key={build.id}
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
		</ul>
	)
}

export default MyRecentBuildsList
