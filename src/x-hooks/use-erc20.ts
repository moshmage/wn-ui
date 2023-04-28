import {ERC20,} from "@taikai/dappkit";
import {useWeb3Context} from "@/x-hooks/use-web3-context";
import {Web3} from "@/providers/web3";
import {useEffect, useState,} from "react";
import {addToken, getTokensList, useTokensList} from "@/x-hooks/use-tokens-list";
import {TokenListEntry} from "@/types/store-list";
import {useConnected} from "@/x-hooks/useConnected";

export const useErc20 = (contractAddress?: string) => {
  const web3: Web3 = useWeb3Context();
  const tokenEntry: TokenListEntry = useTokensList(store => store[contractAddress]);
  const connection = useConnected();
  const [token, setToken] = useState(null);

  const initialize = async () => {
    if (!web3.connected)
      return;

    if (!tokenEntry) {
      const _token = new ERC20(web3.connection, contractAddress);
      await _token.start();
      if (contractAddress)
        addToken({
          contractAddress,
          name: await _token.name(),
          symbol: await _token.symbol(),
          totalSupply: await _token.totalSupply(),
          token: _token,
        })
    }

    const _token = getTokensList()[contractAddress];
    if (_token)
      setToken(_token)
  }

  const deploy = async (name, symbol, maxAmount, treasury) => {
    const _token = new ERC20(web3.connection);
    await _token.loadAbi();
    await _token.deployJsonAbi(name, symbol, maxAmount, treasury);
    await initialize();
  }

  useEffect(() => { initialize() }, [connection.connected]);

  return {token, deploy};
}