// @flow strict

export interface LayoutElementData {
	i: string;
	x: number;
	y: number;
	w: number;
	h: number;
	minW?: number;
	minH?: number;
}

export type LayoutState = LayoutElementData[]
