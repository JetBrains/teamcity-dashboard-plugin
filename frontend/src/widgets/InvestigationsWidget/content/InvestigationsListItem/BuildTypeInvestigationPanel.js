// @flow strict
import React from 'react'
import BuildTypeStatus from '../../../../components/BuildTypeStatus/BuildTypeStatus'
import type { BuildTypeId } from '../../../../hooks/TC/schemata'
import styles from './styles.css'

interface Properties {
	id: BuildTypeId;
	name: string;
	webUrl: string;
}

const BuildTypeInvestigationPanel = ({ id, name, webUrl }: Properties) => {
	return (
		<div>
			<BuildTypeStatus buildTypeId={id} />
			<a href={webUrl} className={styles.builtTypeInvestigationLink}>{name}</a>
		</div>
	)
}

export default BuildTypeInvestigationPanel
