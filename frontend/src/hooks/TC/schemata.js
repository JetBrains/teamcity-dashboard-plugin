// @flow strict
export type BuildTypeId = string

export type BuildTypeInternalId = string

export type BuildType = {
	id: BuildTypeId,
	internalId: BuildTypeInternalId,
	name: string,
	projectId: ProjectId,
	webUrl: string,
	...
}

export type BuildTypesHash = {
	[id: BuildTypeId]: BuildType,
	...
}

export type ProjectId = string;
