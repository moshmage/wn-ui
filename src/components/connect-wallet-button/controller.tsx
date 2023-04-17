import ConnectWalletButtonView from "@/components/connect-wallet-button/view";
import {useWeb3Context} from "@/contexts/use-web3-context";
import {Web3} from "@/providers/web3";
import {useEffect, useState} from "react";

export default function ConnectWalletButton(props?: {onConnect?: () => void}) {

  const web3: Web3 = useWeb3Context();
  const [connected, setConnected] = useState(false);

  async function onClick() {
    const result = await web3.connect();
    if (result)
      props?.onConnect?.();

    setConnected(result);
  }

  return <ConnectWalletButtonView connected={connected}
                                  isConnecting={web3.isConnecting}
                                  currentAddress={web3.currentConnectedAddress}
                                  onClick={() => onClick()}/>
}