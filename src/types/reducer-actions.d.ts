export interface ReducerActions<X = number, T = unknown> {
  type: X;
  payload: T;
}