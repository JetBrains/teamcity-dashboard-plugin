// @flow strict
import { type Layout } from './store/slices/layoutSlice'
import { type WidgetData } from './store/slices/widgetsSlice'

export interface Record<K, V> {
	[key: K]: V;
}

export interface DashboardData {
	layout: Layout;
	widgets: WidgetData[];
}

export type AsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface AsyncState {
	status: AsyncStatus;
	error: ?string;
}

export type UserId = number

export type SetNewDataFunction<T> = (newData: T) => void
