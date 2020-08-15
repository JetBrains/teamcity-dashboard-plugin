// @flow strict
import React from 'react'
import type { ChangeId } from '../../changes.slice'
import ChangeView from '../ChangeView/ChangeView'
import styles from './styles.css'

interface Properties {
	changesIds: ChangeId[];
}

const ChangesList = ({ changesIds }: Properties) => {
	return (
		<div className={styles.ChangesList}>
			{changesIds.map((id) => (
				<ChangeView key={id} changeId={id} />
			))}
		</div>
	)
}

export default ChangesList
