/**
 * Flowtype definitions for index
 * Generated by Flowgen from a Typescript Definition
 * Flowgen v1.11.0
 */

import * as React from 'react'
declare module.exports: typeof ReactGridLayout
declare class ReactGridLayout_v1XX
	mixins React.Component<ReactGridLayout$ReactGridLayoutProps> {}
declare var ReactGridLayout: typeof npm$namespace$ReactGridLayout

declare var npm$namespace$ReactGridLayout: {|
	WidthProvider: typeof ReactGridLayout$WidthProvider,

	Responsive: typeof ReactGridLayout$Responsive,
|}
declare interface ReactGridLayout$Layout {
	/**
	 * A string corresponding to the component key.
	 * Uses the index of components instead if not provided.
	 */
	i: string;

	/**
	 * X position in grid units.
	 */
	x: number;

	/**
	 * Y position in grid units.
	 */
	y: number;

	/**
	 * Width in grid units.
	 */
	w: number;

	/**
	 * Height in grid units.
	 */
	h: number;

	/**
	 * Minimum width in grid units.
	 */
	minW?: number;

	/**
	 * Maximum width in grid units.
	 */
	maxW?: number;

	/**
	 * Minimum height in grid units.
	 */
	minH?: number;

	/**
	 * Maximum height in grid units.
	 */
	maxH?: number;

	/**
	 * set by DragEvents (onDragStart, onDrag, onDragStop) and ResizeEvents (onResizeStart, onResize, onResizeStop)
	 */
	moved?: boolean;

	/**
	 * If true, equal to `isDraggable: false` and `isResizable: false`.
	 */
	static?: boolean;

	/**
	 * If false, will not be draggable. Overrides `static`.
	 */
	isDraggable?: boolean;

	/**
	 * If false, will not be resizable. Overrides `static`.
	 */
	isResizable?: boolean;
}

declare interface ReactGridLayout$Layouts {
	[P: string]: ReactGridLayout$Layout[];
}

declare type ReactGridLayout$ItemCallback = (
	layout: ReactGridLayout$Layout[],
	oldItem: ReactGridLayout$Layout,
	newItem: ReactGridLayout$Layout,
	placeholder: ReactGridLayout$Layout,
	event: MouseEvent,
	element: HTMLElement
) => void

declare interface ReactGridLayout$CoreProps {
	/**
	 * The classname to add to the root element.
	 */
	className?: string;

	/**
	 * Inline-style object to pass to the root element.
	 */
	style?: React.CSSProperties;

	/**
	 * If true, the container height swells and contracts to fit contents.
	 */
	autoSize?: boolean;

	/**
	 * A CSS selector for tags that will not be draggable.
	 *
	 * For example: `draggableCancel: '.MyNonDraggableAreaClassName'`
	 *
	 * If you forget the leading. it will not work.
	 */
	draggableCancel?: string;

	/**
	 * A CSS selector for tags that will act as the draggable handle.
	 *
	 * For example: `draggableHandle: '.MyDragHandleClassName'`
	 *
	 * If you forget the leading . it will not work.
	 */
	draggableHandle?: string;

	/**
	 * If true, the layout will compact vertically.
	 */
	verticalCompact?: boolean;

	/**
	 * Compaction type.
	 */
	compactType?: 'vertical' | 'horizontal' | null;

	/**
	 * This allows setting the initial width on the server side.
	 * This is required unless using the HOC <WidthProvider> or similar.
	 */
	width?: number;

	/**
	 * Rows have a static height, but you can change this based on breakpoints if you like.
	 */
	rowHeight?: number;

	/**
	 * Configuration of a dropping element. Dropping element is a "virtual" element
	 * which appears when you drag over some element from outside.
	 */
	droppingItem?: {
		i: string,
		w: number,
		h: number,
		...
	};

	/**
	 * If set to false it will disable dragging on all children.
	 */
	isDraggable?: boolean;

	/**
	 * If set to false it will disable resizing on all children.
	 */
	isResizable?: boolean;

	/**
	 * If set to false it will not call `onDrop()` callback.
	 */
	isDroppable?: boolean;

	/**
	 * If true, grid items won't change position when being dragged over.
	 */
	preventCollision?: boolean;

	/**
	 * Uses CSS3 `translate()` instead of position top/left.
	 * This makes about 6x faster paint performance.
	 */
	useCSSTransforms?: boolean;

	/**
	 * Default Infinity, but you can specify a max here if you like.
	 * Note that this isn't fully fleshed out and won't error if you specify a layout that
	 * extends beyond the row capacity. It will, however, not allow users to drag/resize
	 * an item past the barrier. They can push items beyond the barrier, though.
	 * Intentionally not documented for this reason.
	 */
	maxRows?: number;

	/**
	 * Scale coefficient for CSS3 `transform: scale()`
	 */
	transformScale?: number;

	/**
	 * Calls when drag starts.
	 */
	onDragStart?: ReactGridLayout$ItemCallback;

	/**
	 * Calls on each drag movement.
	 */
	onDrag?: ReactGridLayout$ItemCallback;

	/**
	 * Calls when drag is complete.
	 */
	onDragStop?: ReactGridLayout$ItemCallback;

	/**
	 * Calls when resize starts.
	 */
	onResizeStart?: ReactGridLayout$ItemCallback;

	/**
	 * Calls when resize movement happens.
	 */
	onResize?: ReactGridLayout$ItemCallback;

	/**
	 * Calls when resize is complete.
	 */
	onResizeStop?: ReactGridLayout$ItemCallback;

	/**
	 * Calls when some element has been dropped
	 */
	onDrop?: (elemParams: {
		x: number,
		y: number,
		w: number,
		h: number,
		e: Event,
		...
	}) => void;
}

declare type ReactGridLayout$ReactGridLayoutProps = {
	/**
	 * Number of columns in this layout.
	 */
	cols?: number,

	/**
	 * Margin between items `[x, y]` in px.
	 */
	margin?: [number, number],

	/**
	 * Padding inside the container `[x, y]` in px.
	 */
	containerPadding?: [number, number],

	/**
	 * Layout is an array of object with the format:
	 *
	 * `{x: number, y: number, w: number, h: number}`
	 *
	 * The index into the layout must match the key used on each item component.
	 * If you choose to use custom keys, you can specify that key in the layout
	 * array objects like so:
	 *
	 * `{i: string, x: number, y: number, w: number, h: number}`
	 *
	 * If not provided, use data-grid props on children.
	 */
	layout?: ReactGridLayout$Layout[],

	/**
	 * Callback so you can save the layout.
	 * Calls back with (currentLayout) after every drag or resize stop.
	 */
	onLayoutChange?: (layout: ReactGridLayout$Layout[]) => void,
	...
} & ReactGridLayout$CoreProps

declare type ReactGridLayout$ResponsiveProps = {
	/**
	 * `{name: pxVal}, e.g. {lg: 1200, md: 996, sm: 768, xs: 480}`
	 *
	 * Breakpoint names are arbitrary but must match in the cols and layouts objects.
	 */
	breakpoints?: {
		[P: string]: number,
		...
	},

	/**
	 * Number of cols. This is a breakpoint -> cols map, e.g. `{lg: 12, md: 10, ...}`.
	 */
	cols?: {
		[P: string]: number,
		...
	},

	/**
	 * Margin between items in px and formatt [x, y] or { breakpoint: [x, y] }.
	 */
	margin?:
		| [number, number]
		| {
				[P: string]: [number, number],
				...
		  },

	/**
	 * Padding inside the container in px and formatt [x, y] or { breakpoint: [x, y] }.
	 */
	containerPadding?:
		| [number, number]
		| {
				[P: string]: [number, number],
				...
		  },

	/**
	 * layouts is an object mapping breakpoints to layouts.
	 *
	 * e.g. `{lg: Layout[], md: Layout[], ...}`
	 */
	layouts?: ReactGridLayout$Layouts,

	/**
	 * Calls back with breakpoint and new number pf cols.
	 */
	onBreakpointChange?: (newBreakpoint: string, newCols: number) => void,

	/**
	 * Callback so you can save the layout.
	 */
	onLayoutChange?: (
		currentLayout: ReactGridLayout$Layout[],
		allLayouts: ReactGridLayout$Layouts
	) => void,

	/**
	 * Callback when the width changes, so you can modify the layout as needed.
	 */
	onWidthChange?: (
		containerWidth: number,
		margin: [number, number],
		cols: number,
		containerPadding: [number, number]
	) => void,
	...
} & ReactGridLayout$CoreProps

declare class ReactGridLayout$Responsive
	mixins React.Component<ReactGridLayout$ResponsiveProps> {}

declare interface ReactGridLayout$WidthProviderProps {
	/**
	 * If true, WidthProvider will measure the container's width before mounting children.
	 * Use this if you'd like to completely eliminate any resizing animation on
	 * application/component mount.
	 */
	measureBeforeMount?: boolean;
}

declare function ReactGridLayout$WidthProvider<P>(
	component: React.ComponentClass<P> | React.FunctionComponent<P>
): React.ComponentClass<P & ReactGridLayout$WidthProviderProps>
