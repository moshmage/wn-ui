import '@testing-library/jest-dom';
import ERC20, {start} from '../../__mocks__/dappkit/ERC20';
import {useErc20} from "@/x-hooks/use-erc20";
import {act, renderHook} from "@testing-library/react";

import ethereum from "@/__mocks__/ethereum";
import {Web3EffectsProvider} from "@/contexts/web3-effects";
import {useWeb3Context} from "@/x-hooks/use-web3-context";

jest.mock(`../../x-hooks/use-web3-context`, () => ({useWeb3Context: () => ({connected: true})}))
jest.mock('@taikai/dappkit', () => ({ERC20: ERC20}))

describe(`useErc20()`, () => {

  beforeAll(() => {
    window.ethereum = ethereum as any;
  })

  it(`should add 0x1 as a mocked token`, async () => {
    let token, hook;

    await act(async () => {
      hook = renderHook(() => useErc20('0x1'));
    })

    token = hook.result.current.token;

    expect(token).toBeTruthy();
    expect(token?.name).toBe(`name`);
    expect(token?.symbol).toBe(`symbol`);
    expect(token?.totalSupply).toBe(`10`);
    expect(start).toHaveBeenCalled()
  })
})