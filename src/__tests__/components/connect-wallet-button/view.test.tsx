import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import ConnectWalletButtonView from "@/components/connect-wallet-button/view";

describe(`ConnectWalletButton()`, () => {
  let isConnecting: boolean, connected: boolean, address: string;

  beforeEach(() => {
    isConnecting = false;
    connected = false;
    address = ``;
  })

  it(`renders "connect" button`, () => {
    const fn = jest.fn();
    render(<ConnectWalletButtonView isConnecting={isConnecting} connected={connected} currentAddress={address} onClick={fn} />)
    const btn = screen.queryByRole('button', {name: /connect/i});
    expect(btn).toBeInTheDocument();
    btn?.click();
    expect(fn).toHaveBeenCalled()
  })

  it(`renders "connecting" text`, () => {
    isConnecting = true;
    render(<ConnectWalletButtonView isConnecting={isConnecting} connected={connected} currentAddress={address} />)

    expect(screen.queryByRole('button', {name: /connecting/i})).toBeInTheDocument();
  });

  it(`renders "address" text`, () => {
    connected = true;
    address = `my address`;
    render(<ConnectWalletButtonView isConnecting={isConnecting} connected={connected} currentAddress={address} />)

    expect(screen.queryByRole('button', {name: /my address/i})).toBeInTheDocument();
  });

  it(`renders "connected" text`, () => {
    connected = true;
    render(<ConnectWalletButtonView isConnecting={isConnecting} connected={connected} currentAddress={address} />)

    expect(screen.queryByRole('button', {name: /connected/i})).toBeInTheDocument();
  });
})