import {useWeb3Context} from "@/contexts/use-web3-context";
import {useEffect, useState} from "react";

export default function useWeb3() {
  const {} = useWeb3Context();
  const [currentAddress, setCurrentAddress] = useState(``);

  useEffect(() => {})

  return {currentAddress,};
}