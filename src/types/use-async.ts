export interface IAsyncResult<T = any> {
  execute: ()=> void
  loading: boolean,
  result: T | null,
  error: any,
  reFetch: ()=> void
}