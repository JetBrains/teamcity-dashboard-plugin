// @flow strict
import React, { useState, useCallback } from 'react'
import classNames from 'classnames'
import type { ChangeId } from '../../changes.slice'
import ChangeView from '../ChangeView/ChangeView'
import styles from './ChangesList.css'
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

	const changesListClasses = classNames(styles.ChangesList, {
		[styles.paddings]: changesIds.length > 0,
	})

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
			<div className={changesListClasses}>
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
