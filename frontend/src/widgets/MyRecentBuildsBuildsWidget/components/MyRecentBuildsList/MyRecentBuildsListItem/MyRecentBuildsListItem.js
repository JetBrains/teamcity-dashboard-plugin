// @flow strict
import React from 'react'
import type { BuildId } from '../../../../../features/builds/builds.types'

import styles from './MyRecentBuildsListItem.css'
import { useBuild } from '../../../../../features/builds/builds.hooks'
import BuildTypeLinkWithPath from '../BuildTypeLinkWithPath/BuildTypeLinkWithPath'
import BuildInfo from '../../../../../features/builds/components/BuildInfo/BuildInfo'
import Divider from '../../../../../components/Divider/Divider'

interface Properties {
	withBuildTypeHeader: boolean,
	withDivider: boolean,
	buildId: BuildId
}

const MyRecentBuildsListItem = ({ buildId, withBuildTypeHeader, withDivider }: Properties) => {

	const build = useBuild(buildId)
	// debugger

	return build ? (
		<li>
			{ withDivider && <Divider className={styles.divider}/> }
			{ withBuildTypeHeader && <BuildTypeLinkWithPath buildTypeId={build.buildType} />}
			<BuildInfo buildId={buildId} />
		</li>
	) : <span>Loading...</span>
}

export default MyRecentBuildsListItem
