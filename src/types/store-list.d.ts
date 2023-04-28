import {ERC20} from "@taikai/dappkit";

export enum TokenListStoreActions {
  add, remove, setToken
}

interface BasePayload {
  contractAddress: string;
}

interface AddPayload extends BasePayload {
  name: string;
  symbol: string;
  totalSupply: string;
  token?: ERC20;
}

export interface TokenListAction {
  type: TokenListStoreActions;
  payload: BasePayload | AddPayload;
}

export type TokenListEntry = AddPayload | null;

export interface TokenListStore {
  [contractAddress: string]: TokenListEntry;
}