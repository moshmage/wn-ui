import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react'


import ConnectWalletButton from "@/components/connect-wallet-button/controller";
import ethereum from "@/__mocks__/ethereum";
import userEvent from "@testing-library/user-event";
import {Web3EffectsProvider} from "@/contexts/web3-effects";

describe(`ConnectWalletButton()`, () => {

  beforeAll(() => {
    window.ethereum = ethereum as any;
  })

  it(`clicking connect calls connect and changes to address`, async () => {

    render(<Web3EffectsProvider><ConnectWalletButton /></Web3EffectsProvider>);

    await userEvent.click(screen.getByRole(`button`, {name: /connect$/i}));
    expect(screen.getByRole(`button`, {name: new RegExp(process.env.TEST_DEFAULT_WALLET!, 'i')})).toBeInTheDocument();
  })
})