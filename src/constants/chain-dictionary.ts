import {numberToHex} from "web3-utils";

enum ChainIds {
  LOCAL = 1337,
  ETHEREUM = 1,
  RINKEBY = 4,
  GOERLI = 5,
  POLYGON = 137,
  MUMBAI = 80001
}

const chainItem = (chainId: number, chainName: string, rpcUrl: string) =>
  ({chainId: numberToHex(chainId), chainName, rpcUrls: [rpcUrl]});

export const ChainDictionary = {
  1337: chainItem(ChainIds.LOCAL, `LOCAL`, `http://localhost:8545`),
  1: chainItem(ChainIds.ETHEREUM, `Ethereum`, `https://rpc.ankr.com/eth`),
  4: chainItem(ChainIds.RINKEBY, `Rinkeby`, `https://rpc.ankr.com/eth_rinkeby`),
  5: chainItem(ChainIds.GOERLI, `Goerli`, `https://rpc.ankr.com/eth_goerli`),
  137: chainItem(ChainIds.POLYGON, `Polygon`, `https://rpc.ankr.com/polygon`),
  80001: chainItem(ChainIds.MUMBAI, `Mumbai`, `https://rpc.ankr.com/mumbai`),

}