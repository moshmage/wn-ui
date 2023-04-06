import If from "@/components/conditionals/if";

export default function ConnectWalletButton({
                                      isConnecting = false,
                                      connected = false,
                                      currentAddress = ``,
                                      onClick = ((e: MouseEvent) => {}),
                                    }) {

  return <button onClick={e => onClick(e as MouseEvent)}>
    <If condition={isConnecting}><>Connecting</></If>
    <If condition={connected}>
      <>{currentAddress || `Connected`}</>
    </If>
    <If condition={!connected}><>Connect</></If>
  </button>
}