import If from "@/components/conditionals/if";
import {ConnectWalletButtonProps} from "@/components/connect-wallet-button/types";

export default function ConnectWalletButtonView({
                                      isConnecting = false,
                                      connected = false,
                                      currentAddress = ``,
                                      onClick = ((e: MouseEvent) => {}),}: ConnectWalletButtonProps) {

  return <button onClick={e => onClick(e as MouseEvent)}>
    <If condition={isConnecting}><>Connecting</></If>
    <If condition={connected}>
      <>{currentAddress || `Connected`}</>
    </If>
    <If condition={!connected}><>Connect</></If>
  </button>
}