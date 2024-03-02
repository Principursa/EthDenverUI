// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect } from "react";
/* import {
  fetchContractData,
  formattedPoolReserves,
} from "../hooks/fetchContractData";
 */
import { Progress } from "@material-tailwind/react";
import Usdc from "../assets/usdc.png";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { MetaAccount } from "../abis/MetaAccount";

import { Contracts } from "../abis/Twine";

import { parseAbi } from "viem";

const erc20abi = parseAbi([
  "function balanceOf(address owner) view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 amount)",
  "function approve(address spender,uint256 value) public returns (bool)",
  "function decimals() public view returns(uint8)",
]);

function LendingMarket() {
  const account = useAccount();
  const twineCF = 0.1;
  const aaveCF = 0.85;
  //console.log(formattedPoolReserves);

  const { isPending, writeContract, isError, error } = useWriteContract();
  console.log("isError", isError);
  console.log("error", error);
  console.log(isPending);

  const { data: balance } = useReadContract({
    abi: erc20abi,
    address: Contracts.metaAccount,
    functionName: "balanceOf",
    args: [account.address],
  });
  const { data: healthFactor } = useReadContract({
    abi: MetaAccount,
    address: Contracts.metaAccount,
    functionName: "healthFactor",
    args: [account.address],
  });

  const { data: decimals } = useReadContract({
    abi: erc20abi,
    address: Contracts.usdc,
    functionName: "decimals",
    args: [],
  });
  const { data: assets } = useReadContract({
    abi: MetaAccount,
    address: Contracts.metaAccount,
    functionName: "convertToAssets",
    args: [balance],
  });

  const { data: borrowSharesPerBorrower } = useReadContract({
    abi: MetaAccount,
    address: Contracts.metaAccount,
    functionName: "borrowSharesPerBorrower",
    args: [account.address],
  });
  const { data: CreditBorrowSharesPerBorrower } = useReadContract({
    abi: MetaAccount,
    address: Contracts.metaAccount,
    functionName: "creditBorrowSharesPerBorrower",
    args: [account.address],
  });
  var borrowable;

  async function submitMetaAccountApproval(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = formData.get("amount") as string;
    writeContract({
      abi: erc20abi,
      address: Contracts.usdc,
      functionName: "approve",
      args: [Contracts.metaAccount, BigInt(amount)],
    });
  }
  async function submitMetaAccountDeposit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = formData.get("amount") as string;

    writeContract({
      abi: MetaAccount,
      address: Contracts.metaAccount,
      functionName: "deposit",
      args: [BigInt(amount), account.address],
    });
  }
  async function submitMetaAccountWithdrawal(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = formData.get("amount") as string;

    writeContract({
      abi: MetaAccount,
      address: Contracts.metaAccount,
      functionName: "withdraw",
      args: [BigInt(amount), account.address, account.address],
    });
  }

  async function submitBorrow(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const bAmount = formData.get("bAmount") as string;

    writeContract({
      abi: MetaAccount,
      address: Contracts.metaAccount,
      functionName: "borrow",
      args: [BigInt(bAmount), BigInt(bAmount)],
    });
  }

  useEffect(() => {
    /*  setbalance(_assets)
  setdecimals(_decimals)
   */
    // borrowable = Number(formatUnits(assets, decimals)) * (twineCF + aaveCF);
    return () => {};
  }, [decimals, balance, assets]);

  return (
    <div className="w-9/12">
      <div className="text-black p-10">
        <h1 className="font-bold"> Lending Markets</h1>
        <h2> Use the Aave lending market with additional borrowing limit.</h2>
      </div>
      {account.isConnected ? (
        <div>
          <div className="bg-white text-black flex flex-col">
            {assets ? (
              <table className="border-2 border-slate-200 rounded-lg p-12">
                <tbody>
                  <tr className="border-b-2 border-slate-300 p-12">
                    <th>Asset</th>
                    <th>Collateral Factor</th>
                    <th>Borrow Limit</th>
                  </tr>
                  <tr className="">
                    <td>
                      <img src={Usdc} alt="usdc" className="size-8" />
                    </td>
                    <td className="">
                      <div className="flex flex-row">
                        <p className="font-bold mr-4">85%</p>
                        <p>
                          $
                          {Number(formatUnits(assets, decimals)) *
                            (twineCF + aaveCF).toString()}
                          / ${formatUnits(assets, decimals).toString()}
                        </p>
                      </div>
                      <progress value={0.95} className="" id="supplyprogress" />
                    </td>
                    <td className="flex flex-col">
                      <div className="flex flex-row">

                        <p className="font-bold mr-4">50%</p>
                        <p>$80/
                        ${Number(formatUnits(assets, decimals)) *
                          (twineCF + aaveCF).toString()}</p>
                      </div>
                      <progress value={0.5} className="" id="borrowprogress" />
                    </td>
                  </tr>
                </tbody>
                <ul className="flex flex-row justify-between">
                  {/*    Balance: ${formatUnits(assets, decimals).toString()} */}
                  <li>
                    <div></div>
                  </li>
                </ul>
              </table>
            ) : (
              <div>No MetaAccount Position Yet!</div>
            )}
          </div>
          <div className="flex flex-row">
            <div>
              <p className="text-xl text-bold m-10 text-black font-semibold">
                Assets to supply
              </p>
              <div className="text-black flex flex-row justify-between border-t-2 border-b-2 p-3 border-slate-300">
                <p className="m-2">USDC</p>
                <p>16.05%</p>
                <div>
                  <form
                    onSubmit={submitMetaAccountApproval}
                    className="flex flex-col"
                  >
                    <input
                      name="amount"
                      placeholder="1"
                      required
                      className="bg-white"
                    />
                    <button
                      className="text-black border-2 shadow-md border-slate-300"
                      type="submit"
                      disabled={isPending}
                    >
                      {isPending ? "Confirming..." : "Approve"}
                    </button>
                  </form>
                </div>
                <div>
                  <form
                    onSubmit={submitMetaAccountDeposit}
                    className="flex flex-col"
                  >
                    <input name="amount" placeholder="1" className="bg-white" />
                    <button
                      className="text-black border-2 shadow-md border-slate-300"
                      type="submit"
                      disabled={isPending}
                    >
                      {isPending ? "Confirming..." : "Deposit"}
                    </button>
                  </form>
                </div>
                <div>
                  <form
                    onSubmit={submitMetaAccountWithdrawal}
                    className="flex flex-col"
                  >
                    <input name="amount" placeholder="1" className="bg-white" />
                    <button
                      className="text-black border-2 shadow-md border-slate-300"
                      type="submit"
                      disabled={isPending}
                    >
                      {isPending ? "Confirming..." : "Withdraw"}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="">
              <p className="text-xl text-bold m-10 text-black font-semibold">
                Assets to borrow
              </p>
              <div className="text-black flex flex-row justify-between border-t-2 border-b-2 p-3 border-slate-300">
                <p>WBTC</p>
                <p>1.00%</p>
                <div>
                  <form onSubmit={submitBorrow} className="flex flex-col">
                    <input
                      name="bAmount"
                      placeholder="Borrow Amount"
                      className="bg-white"
                    />
                    <button
                      className="text-black border-2 shadow-md border-slate-300"
                      type="submit"
                      disabled={isPending}
                    >
                      {isPending ? "Confirming..." : "Borrow"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Please connect account</div>
      )}
    </div>
  );
}

export default LendingMarket;
