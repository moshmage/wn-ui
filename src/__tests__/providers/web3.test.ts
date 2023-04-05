/**
 * @jest-environment node
 */

import {Web3} from "@/providers/web3";

describe(`Web3`, () => {
  it(`Asserts null state`, () => {
    const _web3 = new Web3(process.env.TEST_RPC_HOST, {autoStart: false,});
    expect(_web3.connection).not.toBe(undefined);
    expect(_web3.connection.started).not.toBe(true);
    expect(_web3.isConnecting).toBe(false);
    expect(_web3.connected).toBe(false);
    expect(_web3.currentConnectedAddress).toBe('');
    expect(_web3.chainId).toBe(null);
  });
})