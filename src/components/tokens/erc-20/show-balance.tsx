import {useErc20} from "@/x-hooks/use-erc20";
import {useEffect, useState} from "react";

export function ShowBalance({contractAddress, ofAddress}) {
  const {token: info} = useErc20(contractAddress);
  const [balance, setBalance] = useState(``);

  const updateBalance = async () => {
    if (!ofAddress || !info?.token) {
      setBalance(`0`);
      return;
    }

    setBalance(await info.token.balanceOf(ofAddress))
  }

  useEffect(() => { updateBalance() }, [ofAddress, info?.token]);

  return <span>{balance}</span>
}