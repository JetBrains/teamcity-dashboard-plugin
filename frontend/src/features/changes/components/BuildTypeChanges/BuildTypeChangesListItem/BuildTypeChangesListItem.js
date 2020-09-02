// @flow strict
import React from 'react'
import type { BuildId } from '../../../../builds/builds.types'
import BuildChanges from '../../../../builds/components/BuildChanges/BuildChanges'
import Divider from '../../../../../components/Divider/Divider'

import styles from './BuildTypeChangesListItem.css'

type Properties = {|
	withDivider: boolean,
	buildId: BuildId,
|}

const BuildTypeChangesListItem = ({ withDivider, buildId }: Properties) => {

	return (
		<li className={styles.BuildTypeChangesListItem}>
			{withDivider && <Divider className={styles.divider} />}
			<BuildChanges buildId={buildId} />
		</li>
	)
}

export default BuildTypeChangesListItem
