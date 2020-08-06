// @flow strict
export type BuildId = number

export type Build = {
	id: BuildId,
	webUrl: string,
	finishDate: string,
	...
}

export const buildFields = 'id,webUrl,finishDate'
