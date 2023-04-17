import {ConnectWalletButtonProps} from "@/components/connect-wallet-button/types";

export default function ConnectWalletButtonView({
                                      isConnecting = false,
                                      connected = false,
                                      currentAddress = ``,
                                      onClick = (() => {}),}: ConnectWalletButtonProps) {

  return <button onClick={() => onClick()}>
    {isConnecting ? `Connecting` : connected ? currentAddress || `Connected` : `Connect` }
  </button>
}