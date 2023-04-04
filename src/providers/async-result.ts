import {IAsyncResult} from "@/types/use-async";

export class AsyncResult<T> implements IAsyncResult<T> {
  constructor(readonly execute = (() => {}),
              readonly error = null,
              readonly loading = false,
              readonly result = null) {}

  reFetch() {
    this.execute();
  }
}