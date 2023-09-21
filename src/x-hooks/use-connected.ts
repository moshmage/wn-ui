import createStore from "react-superstore";

const reducer = (store, {connected, isConnecting}: {connected: boolean, isConnecting: boolean}) => {
  return {...store, connected, isConnecting}
}

export const [useConnected, setConnected] = createStore({connected: false, isConnecting: false}, reducer);