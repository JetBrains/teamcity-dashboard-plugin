// @flow strict
import React, { useState, useCallback } from 'react'
import type { ChangeId } from '../../changes.slice'
import ChangeView from '../ChangeView/ChangeView'
import styles from './styles.css'
import { useBuildTypeIdOption } from '../../../../widgets/BuildTypeChangesWidget/options/hooks'
import TC from '@teamcity/react-api'

const { ChangeDetailsPopup } = TC.Components

interface Properties {
	changesIds: ChangeId[];
}

const ChangesList = ({ changesIds }: Properties) => {
	const [buildTypeId] = useBuildTypeIdOption()

	const [expandedChangeId, setExpandedChangeId] = useState<?ChangeId>()

	const showPopup = useCallback((id: ?ChangeId) => setExpandedChangeId(id), [
		setExpandedChangeId,
	])

	const cancelDialog = useCallback(() => setExpandedChangeId(), [
		setExpandedChangeId,
	])

	return (
		<>
			<ChangeDetailsPopup
				buildTypeId={buildTypeId}
				targetChangeId={expandedChangeId}
				allChangesIds={changesIds}
				show={
					expandedChangeId !== null && expandedChangeId !== undefined
				}
				cancelDialog={cancelDialog}
			/>
			<div className={styles.ChangesList}>
				{changesIds.map((id) => (
					<ChangeView
						key={id}
						changeId={id}
						className={styles.change}
						showChangeDetailsPopup={showPopup}
					/>
				))}
			</div>
		</>
	)
}

export default ChangesList
