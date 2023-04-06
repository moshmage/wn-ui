import createStore from "react-superstore";
import {Web3} from "@/providers/web3";
import {PublicEnv} from "@/constants/env-public";

export const [useWeb3, setWeb3, getWeb3] =
  createStore(new Web3(PublicEnv.defaultRpc))