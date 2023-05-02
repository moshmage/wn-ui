import {renderHook} from "@testing-library/react";
import {setTokensList, useTokensList} from "@/x-hooks/use-tokens-list";

describe(`useTokensList()`, () => {

  it(`expects empty list`, () => {
    const {result: {current}} = renderHook(() => useTokensList());
    expect(Object.keys(current).length).toBeFalsy();
  })

  it(`expects addition of one`, () => {
    const {result: {current}} = renderHook(() => setTokensList);
    const {result: {current: list}} = renderHook(() => useTokensList());

    expect(list['0x1']).not.toBeTruthy();
    current({type: 0, payload: {name: `name`, symbol: `symbol`, contractAddress: `0x1`, totalSupply: 10}});
    expect(list['0x1']).toBeTruthy();
  })

  it(`expects setting of token`, () => {
    const {result: {current}} = renderHook(() => setTokensList);
    const {result: {current: list}} = renderHook(() => useTokensList());

    expect(list['0x1'].token).toBeFalsy();
    current({type: 2, payload: {token: {name: 'name'},contractAddress: '0x1'}});
    expect(list['0x1'].token).not.toBeFalsy();
  })

  it(`expects removal`, () => {
    const {result: {current}} = renderHook(() => setTokensList);
    const {result: {current: list}} = renderHook(() => useTokensList());

    expect(list['0x1']).not.toBeFalsy();
    current({type: 1, payload: {contractAddress: `0x1`}});
    expect(list['0x1']).toBeFalsy();
  });
})