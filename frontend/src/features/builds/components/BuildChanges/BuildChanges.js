// @flow strict
import React, { useMemo, useState, useEffect } from 'react'
import type { BuildId } from '../../builds.slice'
import { useBuild } from '../../builds.hooks'
import styles from './styles.css'
import BuildChangesList from '../../../changes/components/BuildChangesList/BuildChangesList'
import BuildStatusText from '../BuildStatusText/BuildStatusText'
import { useIsExpanded } from '../../../../components/CollapseProvider/CollapseProvider.hooks'
import useToggle from '../../../../hooks/basic/useToggle'
import useToggleState from '../../../../hooks/basic/useToggleState'
import { useAreAllExpanded } from '../../../../widgets/BuildTypeChangesWidget/options/hooks'
import Icon, {
	ChevronDownIcon,
	ChevronRightIcon,
	OkIcon,
} from '@jetbrains/ring-ui/components/icon'

import TC from '@teamcity/react-api'
import ChangesCounter from '../../../changes/components/ChangesCounter/ChangesCounter'
import type { ChangesLocator } from '../../../changes/changes.locator'
import CollapseChangesList from '../../../../widgets/BuildTypeChangesWidget/components/CollapseChangesList/CollapseChangesList'

const { BuildStatusLink } = TC.Components

interface Properties {
	buildId: BuildId;
}

const BuildChanges = React.memo<Properties>(({ buildId }: Properties) => {
	const locator: ChangesLocator = {
		buildId,
	}

	return (
		<CollapseChangesList
			title={`Build #${buildId}`}
			locator={locator}
			extraNode={<BuildStatusLink buildId={buildId} />}
		>
			<BuildChangesList buildId={buildId} />
		</CollapseChangesList>
		// <div className={styles.BuildChanges}>
		// 	<div className={styles.header}>
		// 		<span className={styles.chevronIcon}>
		// 			<Icon
		// 				glyph={isExpanded ? ChevronDownIcon : ChevronRightIcon}
		// 				onClick={toggleExpanded}
		// 			/>
		// 		</span>
		// 		<span className={styles.buildName}>Build #{build?.id}</span>
		// 		<span className={styles.changesCount}>
		// 			<ChangesCounter locator={locator} />
		// 		</span>
		// 		<span className={styles.statusText}>
		// 			<BuildStatusLink buildId={buildId} />
		// 		</span>
		// 	</div>
		// 	<div
		// 		className={styles.changes}
		// 		style={{ display: isExpanded ? 'block' : 'none' }}
		// 	>
		// 		<BuildChangesList buildId={buildId} />
		// 	</div>
		// </div>
	)
})

BuildChanges.displayName = 'BuildChanges'

export default BuildChanges
