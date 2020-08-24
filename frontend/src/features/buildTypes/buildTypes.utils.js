// @flow strict

import type { BuildTypeId } from './buildTypes.types'

import baseUri from '../../utils/baseUri'

export const getBuildTypeLinkHref = (id: BuildTypeId): string =>
	`${baseUri}/buildConfiguration/${id}`
