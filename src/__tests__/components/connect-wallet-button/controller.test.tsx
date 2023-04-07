import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import {setWeb3} from "@/contexts/use-web3";
import {Web3} from "@/providers/web3";
import ConnectWalletButton from "@/components/connect-wallet-button/controller";

describe(`ConnectWalletButton()`, () => {

  it(`asserts connected because TEST_PRIVATE_KEY`, () => {
    setWeb3(new Web3(process.env.NEXT_PUBLIC_DEFAULT_RPC, {privateKey: process.env.TEST_WALLET_PRIVATE_KEY}));

    render(<ConnectWalletButton />)

    expect(screen.getByRole(`button`, {name: new RegExp(process.env.TEST_DEFAULT_WALLET, 'i')})).toBeInTheDocument();
  })
  it(`clicking connect calls connect`, () => {})
})