// @flow strict
import React from 'react'
import classnames from 'classnames'
import ClampedText from '../../../../../components/ClampedText/ClampedText'

import styles from './TestOrProblemInvestigationLink.css'
// $FlowFixMe
import { Link } from '@jetbrains/ring-ui'
import type { InvestigationId } from '../../../investigations.types'
import { useSelector } from 'react-redux'
import {
	selectInvestigationTargetName,
	selectInvestigationTargetType,
	selectInvestigationTargetWebUrl,
} from '../../../investigations.slice'
import LoaderInline from '@jetbrains/ring-ui/components/loader-inline/loader-inline'

type Properties = {|
	investigationId: InvestigationId,
	className?: string,
|}

const TestOrProblemInvestigationLink = ({
	investigationId,
	className,
}: Properties) => {
	const type = useSelector((state) =>
		selectInvestigationTargetType(state, investigationId)
	)
	const href = useSelector((state) =>
		selectInvestigationTargetWebUrl(state, investigationId)
	)
	const name = useSelector((state) =>
		selectInvestigationTargetName(state, investigationId)
	)

	const classes = classnames(styles.TestOrProblemInvestigationLink, className)

	return type !== null && type !== undefined ? (
		<ClampedText maxLines={5} className={classes}>
			<span>
				<span className={styles.type}>
					{type === 'test' ? 'Test: ' : 'Problem: '}
				</span>
				<Link href={href ?? '#'} className={styles.name} active>
					{name ?? 'Loading...'}
				</Link>
			</span>
		</ClampedText>
	) : (
		<LoaderInline />
	)
}

export default TestOrProblemInvestigationLink
