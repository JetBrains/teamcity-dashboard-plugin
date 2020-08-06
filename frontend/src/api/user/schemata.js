// @flow strict

export type UserId = number;

export type User = {
	id: UserId,
	username: string,
	name?: string,
	...
}

export const userFields = 'id,username,name'
