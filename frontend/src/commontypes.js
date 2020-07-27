// @flow
import { type Layout } from './store/slices/layoutSlice'
import { type WidgetData } from './store/slices/widgetsSlice'

export interface Record<K, V> {
	[key: K]: V;
}

export interface DashboardData {
	layout: Layout;
	widgets: WidgetData[];
}

export interface AsyncState {
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

export type SetNewDataFunction<T> = (newData: T) => void
