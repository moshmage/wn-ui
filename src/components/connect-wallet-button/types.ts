export interface ConnectWalletButtonProps {
  isConnecting: boolean,
  connected: boolean,
  currentAddress: string,
  onClick?: (e?: MouseEvent) => void
}
