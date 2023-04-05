import {Web3Connection} from "@taikai/dappkit";

export type ChainIdEventArgs = {chainId: number};
export type AddressEventArgs = {address: string};

export type ConnectionEvent = ChainIdEventArgs & AddressEventArgs;
export type ChangeNetworkEvent = ChainIdEventArgs;
export type ChangeAccountEvent = AddressEventArgs;

export interface IWeb3Reactors {
  onConnectionEvent?(event: ConnectionEvent): void;
  onChangeNetworkEvent?(event: ChangeNetworkEvent): void;
  onChangeAccountEvent?(event: ChangeAccountEvent): void;
  onDisconnectEvent?(): void;
  onError?(e: Error): void;
}

export interface IWeb3 {
  connect(): Promise<boolean>;
  disconnect(): void;

  addNetwork(chainId: number, skipConnectionReady?: boolean): Promise<boolean>;
  switchNetwork(chainId: number): Promise<boolean>;

  subscribe(subscriber: IWeb3Reactors): void;
  unsubscribe(subscriber: IWeb3Reactors|number): void;

  get connected: boolean;
  get isConnecting: boolean;
  get chainId: number|null;
  get currentConnectedAddress: string|null;

  readonly connection: Web3Connection|null;
  readonly reactors: IWeb3Reactors[];


}