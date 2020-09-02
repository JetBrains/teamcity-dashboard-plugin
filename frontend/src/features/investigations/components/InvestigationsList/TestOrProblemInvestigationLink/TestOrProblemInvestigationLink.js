// @flow strict
import React from 'react'
import ClampedText from '../../../../../components/ClampedText/ClampedText'

import styles from './TestOrProblemInvestigationLink.css'
// $FlowFixMe
import { Link } from '@jetbrains/ring-ui'

type Properties = {|
	type: 'test' | 'problem',
	name: string,
	href: string,
	className?: string,
|}

const TestOrProblemInvestigationLink = ({
	type,
	name,
	href,
	className,
}: Properties) => {
	return (
		<ClampedText maxLines={5} className={className}>
			<span>
				<span className={styles.type}>
					{type === 'test' ? 'Test: ' : 'Problem: '}
				</span>
				<Link href={href} active>
					{name}
				</Link>
			</span>
		</ClampedText>
	)
}

export default TestOrProblemInvestigationLink
