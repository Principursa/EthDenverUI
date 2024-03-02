// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Usdc from "../assets/usdc.png";
import Twine from "../assets/twine.png";
import Aave from "../assets/aave.png";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { ATokenVault } from "../abis/ATokenVault";
import { Contracts } from "../abis/Twine";
import { useEffect } from "react";
import { parseAbi, formatUnits } from "viem";
import { sepolia } from 'wagmi/chains' 
import { Address } from "viem";


const erc20abi = parseAbi([
  "function balanceOf(address owner) view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 amount)",
  "function approve(address spender,uint256 value) public returns (bool)",
  "function decimals() public view returns(uint8)",
]);

function CreditVaults() {
  const account = useAccount();
  console.log(account.address)

  const {
    isPending,
    writeContract,
    isError,
    error,
  } = useWriteContract();
  console.log(isError)

  const {
    data: balance,
    refetch: refetchProjects,
    isSuccess,
  } = useReadContract({
    abi: erc20abi,
    address: Contracts.creditVault,
    functionName: "balanceOf",
    args: [account.address as (Address | undefined)],
  });
  console.log(balance);

  const { data: decimals } = useReadContract({
    abi: erc20abi,
    address: Contracts.usdc,
    functionName: "decimals",
    args: [],
  });

  // assets and totalAssets DO NOT WORK, had to find workaround

  const { data: totalAssets } = useReadContract({
    abi: ATokenVault,
    address: Contracts.creditVault,
    functionName: "totalAssets",
    args: [],
  });
  console.log("totalAssets",totalAssets)

  const { data: assets } = useReadContract({
    abi: ATokenVault,
    address: Contracts.creditVault,
    functionName: "convertToAssets",
    args: [balance],
  });

  async function submitApproval(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = formData.get("amount") as string;
    writeContract({
      abi: erc20abi,
      address: Contracts.usdc,
      functionName: "approve",
      args: [Contracts.creditVault, BigInt(amount)],
    });
  }
  async function submitUnderlyingDeposit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = formData.get("amount") as string;

    writeContract({
      abi: ATokenVault,
      address: Contracts.creditVault,
      functionName: "deposit",
      args: [BigInt(amount), account.address],
    });
    console.log(error);
  }

  /*   async function submitATokenApproval(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = formData.get("amount") as string;

    writeContract({
      abi: erc20abi,
      address: Contracts.ausdc,
      functionName: "approve",
      args: [Contracts.creditVault, BigInt(amount)],
    });
  }

  async function submitATokenDeposit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = formData.get("amount") as string;

    writeContract({
      abi: ATokenVault,
      address: Contracts.creditVault,
      functionName: "depositATokens",
      args: [BigInt(amount), account.address],
    });
  } */

  async function submitWithdraw(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = formData.get("amount") as string;

    writeContract({
      abi: ATokenVault,
      address: Contracts.creditVault,
      functionName: "withdraw",
      args: [BigInt(amount), account.address, account.address],
      chainId: sepolia.id,
    });
  }

  useEffect(() => {
    /*     setbalance(assets);
    setdecimals(decimals);
    setTotalSupply(totalAssets);

 */

    refetchProjects?.();

    return () => {};
  }, [balance, assets, totalAssets, decimals, isSuccess]);

  return (
    <div>
 <div className="text-black p-10 width-full">
        <h1 className="font-bold">Credit Vaults</h1>
        <h2 className="mt-2">The tokens are deposited to AAVE</h2>
        <h2 className="mt-2">Then we lend the credit out to user who demand it</h2>
      </div>
      {account.isConnected ? (
        <div className="text-black">
       {assets ? (
  <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
    <div className="text-xl font-bold text-gray-800">
      Balance: ${formatUnits(assets, decimals).toString()}
    </div>
  </div> ) : (
            <div>No MetaAccount Position Yet!</div>
          )}
          <div className="mt-10 border-2 border-slate-200 rounded-lg text-black">
            <table className="bg-white  text-black">
              <tbody>
                <tr className="bg-white border-b-2 border-slate-200 p-12 ">
                  <th scope="col" className="p-5">
                    Asset
                  </th>
                  <th scope="col">Aave + Twine APY</th>
                  <th scope="col" className="p-5">
                    Collateral Factor
                  </th>
                  <th scope="col">Risk</th>
                </tr>
                <tr className="">
                  <td scope="row" className="p-5">
                    <img src={Usdc} alt="usdc" className="size-8" />
                   </td>
                  <td className="">
                    <div className="m-5">
                      <p>25%</p>
                    </div>
                  </td>
                  <td className="m-5">
                    85% -{'>'} 95%
                  </td>
                  <td>Medium</td>
                  {totalAssets}
                  {/* Hardcoded, fix later*/}
                  {/*    <td>{totalAssets.toString()}</td> */}
                </tr>
              </tbody>
            </table>
            <td>
              <form onSubmit={submitApproval} className="flex flex-col">
                <input
                  name="amount"
                  placeholder="Approval amount"
                  required
                  className="bg-white"
                />
                <button
                  className="text-black border-2 shadow-md border-slate-300  hover:border-emerald-300"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Confirming..." : "Approve"}
                </button>
              </form>
            </td>
            <td>
              <form
                onSubmit={submitUnderlyingDeposit}
                className="flex flex-col"
              >
                <input name="amount" placeholder="Deposit amount" className="bg-white" />
                <button
                  className="text-black border-2 shadow-md border-slate-300  hover:border-emerald-300"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Confirming..." : "Deposit"}
                </button>
              </form>
            </td>
            <td>
              <form onSubmit={submitWithdraw} className="flex flex-col">
                <input name="amount" placeholder="Withdrawal amount" className="bg-white" />
                <button
                  className="text-black border-2 shadow-md border-slate-300  hover:border-emerald-300"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Confirming..." : "Withdraw"}
                </button>
              </form>
            </td>
            {/*   <div className="text-black">
            <form onSubmit={submitATokenApproval}>
              <input
                name="amount"
                placeholder="1"
                required
                className="bg-white"
              />
              <button className="text-black" type="submit" disabled={isPending}>
                {isPending ? "Confirming..." : "Approve"}
              </button>
            </form>
            <form onSubmit={submitATokenDeposit}>
              <input name="amount" placeholder="1" className="bg-white" />
              <button className="text-black" type="submit" disabled={isPending}>
                {isPending ? "Confirming..." : "Deposit"}
              </button>
            </form>
          </div> */}
          </div>
        </div>
      ) : (
        <div>Please connect account</div>
      )}
    </div>
  );
}

export default CreditVaults;
