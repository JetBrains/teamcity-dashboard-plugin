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

interface Properties {
	buildId: BuildId;
}

const BuildChanges = ({ buildId }: Properties) => {
	const build = useBuild(buildId)

	const [areAllExpanded] = useAreAllExpanded()

	const [isExpanded, setIsExpanded] = useState(areAllExpanded)
	const toggleExpanded = useToggle(isExpanded, setIsExpanded)

	useEffect(() => {
		setIsExpanded(areAllExpanded)
	}, [areAllExpanded])

	return (
		<div className={styles.BuildChanges}>
			<div className={styles.header}>
				<span className={styles.chevronIcon}>
					<Icon glyph={isExpanded ? ChevronDownIcon : ChevronRightIcon} onClick={toggleExpanded}/>
				</span>
				<span className={styles.buildName}>Build #{build?.id}</span>
				<span className={styles.changesCount}>
					Changes ({build?.changesCount})
				</span>
				<span className={styles.statusText}>
					<BuildStatusText buildId={buildId} />
				</span>
			</div>
			<div
				className={styles.changes}
				style={{ display: isExpanded ? 'block' : 'none' }}
			>
				<BuildChangesList buildId={buildId} />
			</div>
		</div>
	)
}

export default BuildChanges
