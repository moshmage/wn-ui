import ConnectWalletButtonView from "@/components/connect-wallet-button/view";
import {useWeb3Context} from "@/contexts/use-web3-context";
import {Web3} from "@/providers/web3";
import {useConnected} from "@/x-hooks/useConnected";
import {useAddress} from "@/x-hooks/use-address";


export default function ConnectWalletButton(props?: {onConnect?: () => void}) {

  const web3: Web3 = useWeb3Context();
  const connection = useConnected();
  const currentAddress = useAddress();


  async function onClick() {
    const result = await web3.connect();
    if (result)
      props?.onConnect?.();
  }

  return <ConnectWalletButtonView connected={connection.connected}
                                  isConnecting={connection.isConnecting}
                                  currentAddress={currentAddress}
                                  onClick={() => onClick()}/>
}