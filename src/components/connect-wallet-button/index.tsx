import {useWeb3} from "@/contexts/use-web3";
import {IWeb3} from "@/types/web3";
import {useCurrentAddress} from "@/x-hooks/use-current-address";
import If from "@/components/conditionals/if";

export function ConnectWalletButton({
                                      label = `connect`,
                                      connectedLabel = `connected`,
                                      connectingLabel = `connecting` }) {
  const web3: IWeb3 = useWeb3();
  const connectedAddress = useCurrentAddress();

  return <span>
    <If condition={web3.isConnecting}><>{connectingLabel}</></If>
    <If condition={web3.connected}>
      <>{connectedLabel || connectedAddress}</>
    </If>
    <If condition={!web3.connected}><>{label}</></If>
  </span>
}