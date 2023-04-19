import {useWeb3Context} from "@/contexts/use-web3-context";
import {createContext, useEffect, useState} from "react";
import {ChangeAccountEvent, ConnectionEvent, IWeb3Reactors} from "@/types/web3";
import {setAddress} from "@/x-hooks/use-address";
import {setChainId} from "@/x-hooks/use-chain-id";
import {setConnected} from "@/x-hooks/useConnected";

const _context = {};
export const Web3EffectsContext = createContext(_context);
export const Web3EffectsProvider = ({children}) => {
  const web3 = useWeb3Context();

  const initialize = () => {
    const onConnectionEvent = (event: ConnectionEvent) => {
      setAddress(event.address);
      setConnected({connected: true, isConnecting: false});
      setChainId(event.chainId);
    }

    const onChangeAccountEvent = (event: ChangeAccountEvent) => {
      setAddress(event.address);
    }

    const onDisconnectEvent = () => {
      setAddress("");
      setConnected({connected: false, isConnecting: false});
      setChainId(0);
    }

    const subscriber: IWeb3Reactors = {onConnectionEvent, onChangeAccountEvent, onDisconnectEvent};

    web3.subscribe(subscriber);
    return () => { web3.unsubscribe(subscriber) }
  }

  useEffect(initialize, []);

  return <Web3EffectsContext.Provider value={_context} children={children} />
}