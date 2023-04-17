import {act, render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import '@testing-library/jest-dom';

import ConnectWalletButton from "@/components/connect-wallet-button/controller";
import ethereum from "@/__mocks__/ethereum";
import userEvent from "@testing-library/user-event";

describe(`ConnectWalletButton()`, () => {

  beforeAll(() => {
    window.ethereum = ethereum as any;
  })

  it(`clicking connect calls connect`, async () => {

    render(<ConnectWalletButton />)

    await act(async () => {
      return userEvent.click(screen.getByRole(`button`, {name: /connect$/i}));
    })

    expect(screen.getByRole(`button`, {name: new RegExp(process.env.TEST_DEFAULT_WALLET, 'i')})).toBeInTheDocument();
  })
})