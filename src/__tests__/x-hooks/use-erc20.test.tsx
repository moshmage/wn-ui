import '@testing-library/jest-dom';
import ERC20, {start} from '../../__mocks__/dappkit/ERC20';
import {useErc20} from "@/x-hooks/use-erc20";
import {act, renderHook} from "@testing-library/react";

import ethereum from "@/__mocks__/ethereum";
import {setTokensList,} from "@/x-hooks/use-tokens-list";



let connected = undefined;
jest.mock(`../../x-hooks/use-web3-context`, () => ({useWeb3Context: () => ({connected})}))
jest.mock('@taikai/dappkit', () => ({ERC20: ERC20}))

describe(`useErc20()`, () => {

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
    let token, hook;

    await act(async () => {
      hook = renderHook(() => useErc20('0x1'));
    })

    token = hook.result.current.token;

    expect(token).toBeTruthy();
    expect(token?.name).toBe(`name`);
    expect(token?.symbol).toBe(`symbol`);
    expect(token?.totalSupply).toBe(`10`);
    expect(start).toHaveBeenCalled();
  })

  it(`with connected() false`, async () => {
    connected = false;
    let hook, token;

    await act(async () => {
      hook = renderHook(() => useErc20('0x1'));
    });

    token = hook.result.current.token;
    expect(token).not.toBeTruthy();
    expect(start).not.toHaveBeenCalled();
  })
})