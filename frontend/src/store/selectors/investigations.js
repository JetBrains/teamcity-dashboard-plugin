// @flow strict
import {
	selectInvestigationsWidgetShowFixedOption,
	selectInvestigationsWidgetSortByOption,
} from './investigationsWidgetData'
import { selectAllInvestigations } from '../slices/investigationsSlice'
import type { InvestigationsSortingOption } from '../../hooks/investigations/useInvestigationsSortedBy'
import type { Investigation } from '../slices/investigationsSlice'
import { createSelector } from '@reduxjs/toolkit'
import type { BuildTypesHash } from '../slices/buildTypesSlice'
import type { RootState } from '..'

const sortInvestigations = (
	investigations: Investigation[],
	sortBy: InvestigationsSortingOption,
	buildTypes: BuildTypesHash
): Investigation[] => {
	if (sortBy === 'time') return investigations
	const copy = investigations.slice()
	copy.sort((investigation1, investigation2) => {
		const comparingPathResult = investigation1.projectFullName.localeCompare(
			investigation2.projectFullName
		)
		if (comparingPathResult !== 0) {
			return comparingPathResult
		} else {
			const buildType1 = buildTypes[investigation1.target.id]
			const buildType2 = buildTypes[investigation2.target.id]
			console.log('comparing buildTypes', buildType1, buildType2)
			if (!buildType1 || !buildType2) return 0
			return buildType1.name.localeCompare(buildType2.name)
		}
	})
	return copy
}

export const selectFilteredSortedInvestigations: (
	widgetId: string
) => (RootState, BuildTypesHash) => Investigation[] = (widgetId: string) =>
	createSelector(
		(state) => selectInvestigationsWidgetSortByOption(state, widgetId),
		(state) => selectInvestigationsWidgetShowFixedOption(state, widgetId),
		selectAllInvestigations,
		(_, buildTypes: BuildTypesHash) => buildTypes,
		(
			sortBy: InvestigationsSortingOption,
			showFixed: boolean,
			investigations: Investigation[],
			buildTypes: BuildTypesHash
		) => {
			console.log('selector received buildTypes', buildTypes)
			console.log('unfiltered', investigations)
			const filtered = investigations.filter(
				(investigation: Investigation) =>
					(investigation.state !== 'FIXED' || showFixed) &&
					investigation.target.type === 'buildType'
			)
			console.log('filtered', filtered)
			return sortInvestigations(filtered, sortBy, buildTypes)
		}
	)
