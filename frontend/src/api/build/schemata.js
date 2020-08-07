// @flow strict
export type BuildId = number

export type Build = {
	id: BuildId,
	webUrl: string,
	finishDate: string,
	defaultBranch?: boolean,
	...
}

export const buildFields = 'id,webUrl,finishDate,defaultBranch'
