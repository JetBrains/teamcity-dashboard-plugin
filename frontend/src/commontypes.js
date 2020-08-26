// @flow strict

export interface Record<K, V> {
	[key: K]: V;
}

export type AsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AsyncState = {|
	status: AsyncStatus,
	error: ?string,
|}

export type UserId = number

export interface SerializedError {
	name?: string;
	message?: string;
	code?: string;
	stack?: string;
}

export interface FulfilledAction<ThunkArgument, PromiseResult> {
	type: string;
	payload: PromiseResult;
	meta: {
		requestId: string,
		arg: ThunkArgument,
		...
	};
}

export interface PendingAction<ThunkArgument> {
	type: string;
	payload: void;
	meta: {
		requestId: string,
		arg: ThunkArgument,
		...
	};
}

export interface RejectedAction<ThunkArgument> {
	type: string;
	payload: void;
	error: SerializedError;
	meta: {
		requestId: string,
		arg: ThunkArgument,
		aborted: boolean,
		condition: boolean,
		...
	};
}

export type PayloadAction<Payload> = {
	type: string,
	payload: Payload,
	...
}

export type Json = JsonPrimitive | JsonArray | JsonObject

export type JsonPrimitive = void | null | string | number | boolean

export type JsonArray = Array<Json>

export type JsonObject = $Shape<{| [string]: Json |}>
