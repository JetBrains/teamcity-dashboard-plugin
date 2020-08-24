// @flow strict

import type { ProjectId } from './projects.types'
import baseUri from '../../utils/baseUri'

export const getProjectLinkHref = (id: ProjectId): string => `${baseUri}/project/${id}`
