import { Reducer } from 'redux';
import FlatMap from './types/FlatMap';
export interface ActorMap<S> {
    [name: string]: Reducer<S> | undefined;
}
export declare function buildReducer<S>(initialState: S, map: ActorMap<S>): Reducer<S>;
export declare function buildArrayReducer<S, I>(idSelector: (item: S) => I, childReducer: Reducer<S>): Reducer<S[]>;
export declare function buildFlatMapReducer<S>(childReducer: Reducer<S>): Reducer<FlatMap<S>>;
