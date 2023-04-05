/**
 * @jest-environment node
 */

import {Web3} from "@/providers/web3";

describe(`Web3`, () => {
  it(`Asserts null state`, () => {
    const _web3 = new Web3(process.env.NEXT_PUBLIC_DEFAULT_RPC, {autoStart: false,});
    expect(_web3.connection).not.toBe(undefined);
    expect(_web3.connection.started).not.toBe(true);
    expect(_web3.isConnecting).toBe(false);
    expect(_web3.connected).toBe(false);
    expect(_web3.currentConnectedAddress).toBe('');
    expect(_web3.chainId).toBe(null);
  });

  it(`Starts but does not connect`, async () => {
    const _web3 = new Web3(process.env.NEXT_PUBLIC_DEFAULT_RPC);
    expect(_web3.connection.started).toBe(true);
    expect(_web3.isConnecting).toBe(false);
    expect(_web3.connected).toBe(false);
    expect(_web3.currentConnectedAddress).toBe(``);
    expect(await _web3.connection.eth.getChainId()).not.toBe(_web3.chainId);
    expect(_web3.chainId).toBe(null);
  });
})