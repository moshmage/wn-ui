import createStore from "react-superstore";
import {Web3} from "@/providers/web3";
import {PublicEnv} from "@/constants/env-public";

const _proxy = new Web3(PublicEnv.defaultRpc);

export const [useWeb3Context, setWeb3Context, getWeb3Context] =
  createStore(_proxy)