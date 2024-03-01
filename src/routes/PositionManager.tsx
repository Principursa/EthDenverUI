import PieChart from "../PieChart";
import { Address, parseAbi } from "viem";
import { useReadContract, useWriteContract } from "wagmi";
import { Contracts } from "../abis/Twine";
import { MetaAccount } from "../abis/MetaAccount";

const erc20abi = parseAbi([
  "function balanceOf(address owner) view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 amount)",
  "function approve(address spender,uint256 value) public returns (bool)",
]);

import { useAccount } from "wagmi";
function PositionManager() {
  const account = useAccount();

  const { data: balance } = useReadContract({
    abi: erc20abi,
    address: Contracts.creditVault,
    functionName: "balanceOf",
    args: [account.address],
  });

  const {data: healthFactor} = useReadContract({
    abi: MetaAccount,
    address: Contracts.metaAccount,
    functionName: "healthFactor",
    args:[account.address]
  });
  console.log("healthFactor",healthFactor)

  const {
    data: hash,
    isPending,
    writeContract,
    isError,
    error,
  } = useWriteContract();

  console.log(isPending);
  console.log(isError);
  console.log(error);
  async function submitBorrow(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const bAmount = formData.get("bAmount") as string;
    const cAmount = formData.get("cAmount") as string;

    writeContract({
      abi: MetaAccount,
      address: Contracts.metaAccount,
      functionName: "borrow",
      args: [BigInt(bAmount), BigInt(cAmount)],
    });
  }
  async function submitRepay(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const rAddress = formData.get("rAddress") as string;

    writeContract({
      abi: MetaAccount,
      address: Contracts.metaAccount,
      functionName: "repay",
      args: [rAddress],
    });
  }

  return (
    <div className="mt-10">
      {account.isConnected ? (
        <div>
          {balance ? (
            <div>
              <div>
                <PieChart width={500} height={500} />
              </div>
              <div className="text-black">{balance?.toString()}</div>
              <div className="flex flex-col">
                <div>
                 
                </div>
                <div>
                  <form onSubmit={submitRepay}>
                    <input name="rAddress" placeholder="repay" />
                    <button>Repay</button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-black"> No position yet</div>
          )}
        </div>
      ) : (
        <div className="text-black">Please connect account</div>
      )}
    </div>
  );
}

export default PositionManager;
