import {renderHook, act} from "@testing-library/react";
import useAsync from "@/x-hooks/use-async";
import {AsyncRunner} from "@/providers/async-runner";

describe(`useAsync()`, () => {
  it(`Not immediate`, () => {
    const _asyncFn = jest.fn(() => Promise.resolve(true));
    const {result: {current: {execute, error, loading, result}}} =
      renderHook<AsyncRunner<any>>(() => useAsync(_asyncFn, false));

    act(() => {})

    expect(_asyncFn).not.toHaveBeenCalled();
    execute?.();
    expect(_asyncFn).toHaveBeenCalled();
  })

  it(`immediate`, () => {
    const _asyncFn = jest.fn();
    const {result} =
      renderHook<AsyncRunner<any>>(() => useAsync(_asyncFn));

    act(() => {})

    expect(_asyncFn).toHaveBeenCalled();
  });
})