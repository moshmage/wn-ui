## Getting Started

#### First, run the development server:

```bash
npm run dev
```

#### Testing
Start watching your unit tests
```bash
npm run test-dev
```

## Developing

### Structure
`src` holds source files, following `NextJS`; And all defaults from `NextJS` apply to this project.

`components` folder holds components, these are organized into folders and need to be as atomic as possible so the unit
testing made on them is easy to maintain, do and understand (see [`src/components/connect-wallet-button`](src/components/connect-wallet-button))

`__tests__` and `__mocks__` follow the defaults from jest, some helpers are available and detailed further on.

### Web3 and React connection
`_app.tsx` uses [`<Web3EffectsProvider />`](src/contexts/web3-effects.tsx), which essentially reads the values from our [`web3-provider`](src/providers/web3.ts)
and updates the [`react-superstore`](https://www.npmjs.com/package/react-superstore) value of the files on [`x-hooks`](src/x-hooks) which are how we read the values 
(`useAddress`, `useConnected`, `useChainId`)

#### More reactivity
You can add more effects, if needed, calling [`web3-provider:subscribe`](src/providers/web3.ts#L93) as so:

```ts
import {useWeb3Context} from "@/x-hooks/use-web3-context";
import {IWeb3Reactors} from "@/types/web3";
import {ConnectionEvent} from "@/types/web3";

const web3 = useWeb3Context();

const subscriber: IWeb3Reactors = {
  onConnectionEvent(event: ConnectionEvent) {
    // do stuff
  },
  onChangeNetworkEvent(event: ChangeNetworkEvent) {},
  onChangeAccountEvent(event: ChangeAccountEvent) {},
  onDisconnectEvent() {},
  onError(e: Error) {},
}
```

##### Testing
If you need to unit-test something related to web3, you can use:
```tsx
import ethereum from "@/__mocks__/ethereum";
import {Web3EffectsProvider} from "@/contexts/web3-effects";

// ...

beforeAll(() => {
  window.ethereum = ethereum as any;
})

it(`Something`, () => {
  render(<Web3EffectsProvider><ConnectWalletButton /></Web3EffectsProvider>);
})
```