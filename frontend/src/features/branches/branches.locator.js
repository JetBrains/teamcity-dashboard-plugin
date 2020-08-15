// @flow strict
export type BranchesLocator = {
	name?: string,
	default?: boolean | 'any',
	isGroup?: boolean,
	groupInternalName?: string,
	...
}

export const stringifyBranchesLocator = (locator: BranchesLocator): string => {
	if (locator.isGroup === true) {
		if (locator.groupInternalName === undefined || locator.groupInternalName === null) {
			console.error('Group internal name was undefined but isGroup was true')
		}
		return `group:${locator.groupInternalName ?? ''}`
	}
	const nameLocator =
		locator.name !== undefined && locator.name !== null
			? `name:${locator.name}`
			: undefined
	const defaultLocator =
		locator.default !== undefined && locator.default !== null
			? `default:${String(locator.default)}`
			: undefined
	return [nameLocator, defaultLocator].filter(Boolean).join(',')
}
