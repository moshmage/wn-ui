import {ChangeAccountEvent, ChangeNetworkEvent, ConnectionEvent, IWeb3, IWeb3Reactors} from "@/types/web3";
import {Web3Connection,} from "@taikai/dappkit/dist/src/base/web3-connection";
import {Web3ConnectionOptions,} from "@taikai/dappkit/dist/src/interfaces/web3-connection-options";
import {ChainDictionary} from "@/constants/chain-dictionary";

export class Web3 implements IWeb3 {
  private _connected: boolean = false;
  private _isConnecting: boolean = false;
  private _chainId: number | null = null;
  private _currentConnectedAddress: string = '';
  private _connection: Web3Connection;

  constructor(rpcHost: string, options: Exclude<Web3ConnectionOptions, 'web3Host'> = {}) {
    this._connection = new Web3Connection({web3Host: rpcHost, ...options});
  }

  readonly reactors = [];

  get connected() { return this._connected; }
  get isConnecting() { return this._isConnecting; }
  get chainId() { return this._chainId; }
  get currentConnectedAddress() { return this._currentConnectedAddress; }
  get connection() { return this._connection; }


  async connect(): Promise<boolean> {
    this._isConnecting = true;
    this._connected = false;

    try {
      const result = await this.connection.connect();
      if (!result)
        return Promise.resolve(false);

      await this._onConnectionReady();

    } catch (e) {
      this._isConnecting = false;
      this.reactors.forEach(reactor => reactor.onError?.(e))

      console.error(`Failed to connect`, e);
      return Promise.resolve(false);
    }

    this._connected = true;
    this._isConnecting = false;
    return Promise.resolve(true)
  }

  disconnect() {
    this._connected = false;
    this._currentConnectedAddress = ``;
    this._connection = new Web3Connection(this._connection.options);
    this._chainId = 0;
    this.reactors.forEach(reactor => reactor.onDisconnectEvent?.())
  }

  async addNetwork(chainId: number, skipConnectionReady = false): Promise<boolean> {
    try {
      this._isConnecting = true;
      await window.ethereum.request({method: 'wallet_addEthereumChain', params: [ChainDictionary[chainId]],})
    } catch (e) {
      console.error(`Failed to addNetwork ${chainId}`, e);
      return false;
    } finally {
      this._isConnecting = false;
      if (!skipConnectionReady)
        await this._onConnectionReady();
    }
    return true;
  }

  async switchNetwork(chainId: number): Promise<boolean> {
    try {
      this._isConnecting = true;
      await window.ethereum
        .request({method: 'wallet_switchEthereumChain', params: [{chainId: ChainDictionary[chainId]?.chainId}],});
    } catch (e) {
      if (e?.code === 4902)
        return this.addNetwork(chainId, true)
          .then(() => this.switchNetwork(chainId));
      else console.error(`Failed to switchNetwork ${chainId}`, e);

      return false;
    } finally {
      this._isConnecting = false;
      await this._onConnectionReady()
    }

    return true;
  }

  subscribe(subscriber: IWeb3Reactors): void {
    if (this.reactors.includes(subscriber))
      return;

    this.reactors.push(subscriber);
  }

  unsubscribe(subscriber: IWeb3Reactors) {
    const index = this.reactors.indexOf(subscriber);
    if (index === -1)
      return;

    this.reactors.splice(index, 1);
  }

  async _onConnectionReady() {

    this._currentConnectedAddress = (await this.connection.eth.getAccounts())?.[0];
    this._chainId = await this.connection.eth.getChainId();

    console.log(`_onConnectionReady`, this._currentConnectedAddress)

    const callReactorEventFn =
      (reactor, fnKey: keyof IWeb3Reactors, e: ChangeNetworkEvent|ChangeAccountEvent|ConnectionEvent) =>
        reactor[fnKey] ? reactor[fnKey](e) : null;

    ([
      [`accountsChanged`, `onChangeAccountEvent`],
      [`chainChanged`, `onChangeNetworkEvent`]
    ] as [[string, keyof IWeb3Reactors]])
      .forEach(([event,fnKey]) =>
        window.ethereum.on(event, (e: string[]|number) => {
          const payload = {
            ...event === `accountsChanged` ? {address: e[0]} : {chainId: +e}
          }

          this.reactors.forEach(reactor =>
            callReactorEventFn(reactor, fnKey, payload as ChangeNetworkEvent | ChangeAccountEvent))
        }))

    this.reactors.forEach(reactor =>
      callReactorEventFn(reactor, `onConnectionEvent`, {chainId: this._chainId, address: this._currentConnectedAddress}))
  }
}