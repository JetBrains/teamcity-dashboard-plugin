// @flow strict
import React from 'react'
import type { BuildId } from '../../../../../features/builds/builds.types'

import styles from './MyRecentBuildsListItem.css'
import { useBuildBuildTypeId } from '../../../../../features/builds/builds.hooks'
import BuildTypeLinkWithPath from '../BuildTypeLinkWithPath/BuildTypeLinkWithPath'
import BuildInfo from '../../../../../features/builds/components/BuildInfo/BuildInfo'
import Divider from '../../../../../components/Divider/Divider'

interface Properties {
	withBuildTypeHeader: boolean;
	withDivider: boolean;
	buildId: BuildId;
}

const MyRecentBuildsListItem = React.memo<Properties>(
	({ buildId, withBuildTypeHeader, withDivider }: Properties) => {
		const buildTypeId = useBuildBuildTypeId(buildId)

		return buildTypeId !== null && buildTypeId !== undefined ? (
			<li>
				{withDivider && <Divider className={styles.divider} />}
				{withBuildTypeHeader && (
					<BuildTypeLinkWithPath buildTypeId={buildTypeId} />
				)}
				<BuildInfo buildId={buildId} />
			</li>
		) : (
			<span>Loading...</span>
		)
	}
)

MyRecentBuildsListItem.displayName = 'MyRecentBuildsListItem'

export default MyRecentBuildsListItem
