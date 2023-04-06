import ConnectWalletButtonView from "@/components/connect-wallet-button/view";
import {useWeb3} from "@/contexts/use-web3";
import {Web3} from "@/providers/web3";

export default function ConnectWalletButton(props?: {onConnect?: () => void}) {

  const web3: Web3 = useWeb3();

  async function onClick() {
    const result = await web3.connect();
    if (result)
      props?.onConnect?.();
  }

  return <ConnectWalletButtonView connected={web3.connected}
                                  isConnecting={web3.isConnecting}
                                  currentAddress={web3.currentConnectedAddress}
                                  onClick={onClick}/>
}