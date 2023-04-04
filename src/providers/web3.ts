import {ChangeAccountEvent, ChangeNetworkEvent, ConnectionEvent, IWeb3, IWeb3Reactors} from "@/types/web3";
import {Web3Connection, Web3ConnectionOptions} from "@taikai/dappkit";

export class Web3 implements IWeb3 {
  #connected: boolean = false;
  #isConnecting: boolean = false;
  #chainId: number | null = null;
  #currentConnectedAddress: string = '';
  #connection: Web3Connection;

  constructor(rpcHost: string, options: Exclude<Web3ConnectionOptions, 'web3Host'>) {
    this.#connection = new Web3Connection({web3Host: rpcHost, ...options});
  }

  readonly reactors = [];

  get connected() { return this.#connected; }
  get isConnecting() { return this.#isConnecting; }
  get chainId() { return this.#chainId; }
  get currentConnectedAddress() { return this.#currentConnectedAddress; }
  get connection() { return this.#connection; }


  async connect(): Promise<boolean> {
    this.#isConnecting = true;
    this.#connected = false;

    try {
      const result = await this.connection.connect();
      if (!result)
        return Promise.resolve(false);

      await this.#onConnectionReady();

    } catch (e) {
      this.#isConnecting = false;
      this.reactors.forEach(reactor => reactor.onError?.(e))

      console.error(`Failed to connect`, e);
      return Promise.resolve(false);
    }

    this.#connected = true;
    this.#isConnecting = false;
    return Promise.resolve(true)
  }

  disconnect() {
    this.#connected = false;
    this.#currentConnectedAddress = ``;
    this.#connection = new Web3Connection(this.#connection.options);
    this.#chainId = 0;
    this.reactors.forEach(reactor => reactor.onDisconnectEvent?.())
  }

  addNetwork(chainId: number): Promise<boolean> {
    return Promise.resolve(false)
  }

  async switchNetwork(chainId: number): Promise<boolean> {
    return Promise.resolve(false);
  }

  subscribe(subscriber: IWeb3Reactors): void {
    if (this.reactors.includes(subscriber))
      return;

    this.reactors.push(subscriber);
  }

  unsubscribe(subscriber: IWeb3Reactors) {
    const index = this.reactors.indexOf(subscriber);
    if (index > -1)
      this.reactors.splice(index, 1);
  }

  async #onConnectionReady() {

    this.#currentConnectedAddress = await this.connection.getAddress();
    this.#chainId = await this.connection.eth.getChainId();

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
      callReactorEventFn(reactor, `onConnectionEvent`, {chainId: this.#chainId, address: this.#currentConnectedAddress}))
  }
}