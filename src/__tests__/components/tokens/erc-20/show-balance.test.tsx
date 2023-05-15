import '@testing-library/jest-dom';
import ERC20, {start} from "@/__mocks__/dappkit/ERC20";
import {act, render, renderHook, screen} from "@testing-library/react";
import {ShowBalance} from "@/components/tokens/erc-20/show-balance";


jest.mock(`../../../../x-hooks/use-web3-context`, () => ({useWeb3Context: () => ({connected: true})}))
jest.mock('@taikai/dappkit', () => ({ERC20: ERC20}))

describe(`ShowBalance()`, () => {

  it(`shows 0 because no token`, async () => {

    const result = render(<ShowBalance contractAddress="0x1" ofAddress="1"/>);
    await act(async () => {
      expect(result.getByText(/0/i)).toBeTruthy();
    })
  });

  it(`Shows 10 because mocked token`, async () => {
    render(<ShowBalance contractAddress="0x1" ofAddress="1"/>);
    await act(async () => {
      expect(screen.getByText(/0/i)).toBeTruthy();
    })
  })
});