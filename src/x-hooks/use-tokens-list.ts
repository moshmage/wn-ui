import {type AddPayload, type BasePayload, type TokenListAction, type TokenListStore, TokenListStoreActions} from "@/types/store-list.d";
import createStore from "react-superstore";
import {type ERC20} from "@taikai/dappkit";


const reducer = (store: TokenListStore, action: TokenListAction): TokenListStore => {

  const assign = (payload: BasePayload|AddPayload|null) =>
    Object.assign(store, {[action.payload.contractAddress]: payload})

  switch (action.type) {
    case TokenListStoreActions.add:
      return assign(action.payload);

    case TokenListStoreActions.remove:
      return assign(null);

    case TokenListStoreActions.setToken:
      // const {token}: ERC20 = action.payload as ERC20;
      return assign(Object.assign(store[action.payload.contractAddress]||{}, action.payload));

    default:
      return store;
  }
}

export const [useTokensList, setTokensList, getTokensList] = createStore({}, reducer);
export const addToken = (payload: AddPayload) =>
  setTokensList({type: TokenListStoreActions.add, payload})
export const removeToken = (contractAddress: string) =>
  setTokensList({type: TokenListStoreActions.remove, payload: {contractAddress}})