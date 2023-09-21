import '@testing-library/jest-dom';
import ERC20, {start} from '../../__mocks__/dappkit/ERC20';
import {useErc20} from "@/x-hooks/use-erc20";
import {act, renderHook, RenderHookResult} from "@testing-library/react";

import ethereum from "@/__mocks__/ethereum";
import {setTokensList,} from "@/x-hooks/use-tokens-list";



let connected: boolean|undefined = undefined;
jest.mock(`../../x-hooks/use-web3-context`, () => ({useWeb3Context: () => ({connected})}))
jest.mock('@taikai/dappkit', () => ({ERC20: ERC20}))

describe(`useErc20()`, () => {
  let token, hook: RenderHookResult<any, any>;

  beforeAll(() => {
    window.ethereum = ethereum as any;
  })

  beforeEach(() => {
    renderHook(() => setTokensList({type: 1, payload: {contractAddress: '0x1'}}));
    ERC20.mockClear();
    start.mockClear();
  })

  it(`with connected() true`, async () => {
    connected = true;

    await act(async () => {
      hook = renderHook(() => useErc20('0x1'));
    })

    token = hook!.result.current.token;

    expect(token).toBeTruthy();
    expect(token?.name).toBe(`name`);
    expect(token?.symbol).toBe(`symbol`);
    expect(token?.totalSupply).toBe(`10`);
    expect(start).toHaveBeenCalled();
  })

  it(`renders hook twice, only one call`, async () => {
    let hook2;

    await act(async () => {
      hook = renderHook(() => useErc20('0x1'));
    });

    await act(async () => {
      hook2 = renderHook(() => useErc20('0x1'));
    });

    expect(start).toHaveBeenCalledTimes(1);
  })

  it(`with connected() false`, async () => {
    connected = false;

    await act(async () => {
      hook = renderHook(() => useErc20('0x1'));
    });

    token = hook!.result.current.token;
    expect(token).not.toBeTruthy();
    expect(start).not.toHaveBeenCalled();
  });
})