// @flow strict
import React, { useState, useCallback } from 'react'
import classNames from 'classnames'
import ChangeView from '../ChangeView/ChangeView'
import styles from './ChangesList.css'
import { useBuildTypeIdOption } from '../../../../widgets/BuildTypeChangesWidget/options/hooks'
import TC from '@teamcity/react-api'
import type { ChangeId } from '../../changes.types'

const { ChangeDetailsPopup } = TC.Components

type Properties = {|
	changesIds: ChangeId[],
|}

const ChangesList = React.memo<Properties>(({ changesIds }: Properties) => {
	const [buildTypeId] = useBuildTypeIdOption()

	const [expandedChangeId, setExpandedChangeId] = useState<?ChangeId>()

	const showPopup = useCallback((id: ?ChangeId) => setExpandedChangeId(id), [
		setExpandedChangeId,
	])

	const cancelDialog = useCallback(() => setExpandedChangeId(), [
		setExpandedChangeId,
	])

	const changesListClasses = classNames(styles.ChangesList, {
		[styles.ChangesList_notEmpty]: changesIds.length > 0,
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
})

ChangesList.displayName = 'ChangesList'

export default ChangesList
