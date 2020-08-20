// @flow strict

export type ProjectId = string

export type ProjectInternalId = string

export type Project = {
	id: ProjectId,
	internalId: ProjectInternalId,
	name?: string,
	webUrl?: string,
	...
}
