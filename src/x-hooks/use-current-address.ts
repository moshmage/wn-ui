import {useWeb3} from "@/contexts/use-web3";
export const useCurrentAddress = () => useWeb3().currentConnectedAddress;