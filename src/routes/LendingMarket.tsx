// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect } from 'react';
/* import {
  fetchContractData,
  formattedPoolReserves,
} from "../hooks/fetchContractData";
 */
import { Progress } from "@material-tailwind/react";
import Usdc from "../assets/usdc.png";
import Aave from "../assets/aave.png";
import Twine from "../assets/twine.png";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { MetaAccount } from "../abis/MetaAccount";
import BigNumber from 'bignumber.js';
import wBTCLogo from "../assets/wrapped-bitcoin-wbtc-logo.png"

import { Contracts } from "../abis/Twine";

import { parseAbi, parseUnits } from "viem";

const erc20abi = parseAbi([
  "function balanceOf(address owner) view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 amount)",
  "function approve(address spender,uint256 value) public returns (bool)",
  "function decimals() public view returns(uint8)",
]);

const oracleAbi = parseAbi([
  "function getAssetPrice(address asset) external view returns (uint256)"
])



function LendingMarket() {
  const account = useAccount();
  // const twineCF = 0.1;
  const aaveCF = 0.85;
  //console.log(formattedPoolReserves);

  const { isPending, writeContract, isError, error } = useWriteContract();

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

  const { data: usdcDecimals } = useReadContract({
    abi: erc20abi,
    address: Contracts.usdc,
    functionName: "decimals",
    args: [],
  });
  const { data: wbtcDecimals } = useReadContract({
    abi: erc20abi,
    address: Contracts.wbtc,
    functionName: "decimals",
    args: [],
  });
  const { data: assets } = useReadContract({
    abi: MetaAccount,
    address: Contracts.metaAccount,
    functionName: "convertToAssets",
    args: [balance],
  });
  // const { data: wbtcPrice } = useReadContract({
  //   abi: oracleAbi,
  //   address: Contracts.oracle,
  //   functionName: "getAssetPrice",
  //   args: [Contracts.wbtc]
  // })
  const wbtcPrice = BigNumber(60000 * 10 ** 18);
  const { data: metaBalance } = useReadContract({
    abi: erc20abi,
    address: Contracts.vdwbtc,
    functionName: "balanceOf",
    args: [Contracts.metaAccount]
  })
  const { data: creditBalance } = useReadContract({
    abi: erc20abi,
    address: Contracts.creditVault,
    functionName: "balanceOf",
    args: [account.address]
  })
  const { data: totalBorrowShares } = useReadContract({
    abi: MetaAccount,
    address: Contracts.metaAccount,
    functionName: "totalBorrowShares",
    args: []
  })
  const { data: borrowSharesPerBorrower } = useReadContract({
    abi: MetaAccount,
    address: Contracts.metaAccount,
    functionName: "borrowSharesPerBorrower",
    args: [account.address]
  })
  const { data: creditVaultSharePerBorrower } = useReadContract({
    abi: MetaAccount,
    address: Contracts.metaAccount,
    functionName: "creditVaultSharePerBorrower",
    args: [account.address],
  });

  // borrow balance
  var user_borrow_native: BigNumber = new BigNumber(metaBalance ? metaBalance.toString() : '0')
    .multipliedBy(new BigNumber(borrowSharesPerBorrower ? borrowSharesPerBorrower.toString() : '0'))
    .dividedBy(new BigNumber(totalBorrowShares ? totalBorrowShares.toString() : '1'));

  var user_borrow_usd: BigNumber = user_borrow_native.multipliedBy(wbtcPrice).dividedBy(new BigNumber(10).pow(18 + wbtcDecimals));
  const formattedUserBorrowUsd = user_borrow_usd.toFixed(2);

  var twineCF: BigNumber = new BigNumber(creditVaultSharePerBorrower?.toString() ?? '0')
    .dividedBy(new BigNumber(10).pow(6))
    .dividedBy(new BigNumber(Math.round(Number(formatUnits(assets ?? '0', usdcDecimals)))));
  var formattedTwineCF = twineCF.toFixed(2);
  var combinedCF = new BigNumber(formattedTwineCF).plus(aaveCF).toFixed(2);


  async function submitMetaAccountApproval(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = formData.get("amount") as string;
    const BigAmount = BigInt(Math.round(parseFloat(amount) * (10 ** Number(usdcDecimals))));

    writeContract({
      abi: erc20abi,
      address: Contracts.usdc,
      functionName: "approve",
      args: [Contracts.metaAccount, BigAmount],
    });
  }
  async function submitMetaAccountDeposit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = formData.get("amount") as string; // This is a string that could represent a float, e.g., "123.456"

    // Convert the string to a float, then scale it by 10^decimals and convert to BigInt
    // This handles the conversion from a human-readable float to the integer representation expected by the contract
    const BigAmount = BigInt(Math.round(parseFloat(amount) * (10 ** Number(usdcDecimals))));

    try {
      writeContract({
        abi: MetaAccount,
        address: Contracts.metaAccount,
        functionName: "deposit",
        args: [BigAmount, account.address],
      });
    } catch (err) {
      console.dir(err);
    }
  }
  async function submitMetaAccountWithdrawal(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = formData.get("amount") as string;
    const BigAmount = BigInt(Math.round(parseFloat(amount) * (10 ** Number(usdcDecimals))));

    writeContract({
      abi: MetaAccount,
      address: Contracts.metaAccount,
      functionName: "withdraw",
      args: [BigAmount, account.address, account.address],
    });
  }

  async function submitBorrow(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Retrieve the values directly from the event target
    const tokenBorrowAmountElement = document.querySelector('[name="tokenBorrowAmount"]') as HTMLInputElement;
    const creditBorrowAmountElement = document.querySelector('[name="creditBorrowAmount"]') as HTMLInputElement;

    // Check if both inputs have values
    if (!tokenBorrowAmountElement.value || !creditBorrowAmountElement.value) {
      alert('Both fields are required');
      return;
    }

    // Convert input values to BigNumber for precise arithmetic operations
    const tokenBorrowAmount = new BigNumber(tokenBorrowAmountElement.value);
    const wbtcPriceBig = new BigNumber(wbtcPrice); // Assuming wbtcPrice is a string or number variable available in your scope
    const wbtcDecimalsBig = new BigNumber(10).pow(wbtcDecimals); // Assuming wbtcDecimals is a number variable available in your scope

    // Perform the calculation
    const tokenAmount = tokenBorrowAmount
      .dividedBy(wbtcPriceBig.dividedBy(new BigNumber(10).pow(18)))
      .multipliedBy(wbtcDecimalsBig);

    // For creditAmount, assuming usdcDecimals is a number variable available in your scope
    const creditAmount = new BigNumber(creditBorrowAmountElement.value).multipliedBy(new BigNumber(10).pow(usdcDecimals));

    const parsedTokenAmount = parseInt(tokenAmount.toString(), 10)
    const parsedCreditAmount = parseInt(creditAmount.toString(), 10)

    // Now you can use tokenAmount and creditAmount in your writeContract call
    // Make sure to convert BigNumber values to a format compatible with your contract call, such as string or BigInt
    writeContract({
      abi: MetaAccount,
      address: Contracts.metaAccount,
      functionName: "borrow",
      args: [parsedTokenAmount, parsedCreditAmount] // Using toFixed() to convert BigNumber to string
    });
  }

  useEffect(() => {
    /*  setbalance(_assets)
  setdecimals(_decimals)
   */
    // borrowable = Number(formatUnits(assets, decimals)) * (combinedCF);
    return () => { };
  }, [wbtcDecimals, balance, assets]);

  return (
    <div className="w-9/12">
      <div className="text-black p-10 flex flex-col items-start w-full text-left">
        <h1 className="font-bold justify-self-start">Lending Market</h1>
        <h2 className="mt-2"> Use the Aave lending market with additional borrowing limit.</h2>
      </div>
      {account.isConnected ? (
        <div>
          <div className="bg-white text-black flex flex-col">
            {assets ? (
              <table className="border-2 border-slate-200 rounded-lg p-12">
                <tbody>
                  <tr className="border-b-2 border-slate-200 p-12">
                    <th>Market</th>
                    <th>Asset</th>
                    <th>Collateral Factor</th>
                    <th>Borrow Limit</th>
                  </tr>
                  <tr className="">
                    <td>
                      <img src={Aave} alt="aave" className="size-8" />
                    </td>
                    <td>
                      <img src={Usdc} alt="usdc" className="size-8" />
                    </td>
                    <td className="">
                      <div className="flex flex-row">
                        <p className="font-bold mr-4 text-2xl">85%</p>
                        <p>
                          $
                          {Math.round(Number(formatUnits(assets, usdcDecimals)) *
                            (aaveCF)).toString()}
                          / ${Math.round(formatUnits(assets, usdcDecimals)).toString()}
                        </p>
                      </div>
                      <progress value={aaveCF} className="" id="aavesupplyprogress" />
                    </td>
                    <td>
                      <div className="flex flex-row">
                        <p className="font-bold mr-4 text-2xl">{Math.round(formattedUserBorrowUsd / (Number(formatUnits(assets, wbtcDecimals)) * (aaveCF) * 100) * 100)}% </p>
                        <p> ${Math.round(formattedUserBorrowUsd)}
                          / ${Math.round(Number(formatUnits(assets, wbtcDecimals)) * (aaveCF) * 100).toString()}
                        </p>
                      </div>
                      <progress value={
                        formattedUserBorrowUsd / Math.round(Number(formatUnits(assets, wbtcDecimals)) * (aaveCF) * 100)
                      } className="" id="borrowprogress" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src={Twine} alt="twine" className="size-8" />
                    </td>
                    <td>
                      <img src={Usdc} alt="usdc" className="size-8" />
                    </td>
                    <td>
                      <div className="flex flex-row">
                        <p className="font-bold mr-4 text-2xl">{Math.round(combinedCF * 100)}%</p>
                        <p>
                          $
                          {Math.round(Number(formatUnits(assets, usdcDecimals)) *
                            (combinedCF)).toString()}
                          / ${Math.round(formatUnits(assets, usdcDecimals)).toString()}
                        </p>
                      </div>
                      <progress value={combinedCF} className="" id="twinesupplyprogress" />
                    </td>
                    <td>
                      <div className="flex flex-row">
                        <p className="font-bold mr-4 text-2xl">{Math.round(formattedUserBorrowUsd / (Number(formatUnits(assets, wbtcDecimals)) * (combinedCF) * 100) * 100)}% </p>
                        <p> ${Math.round(formattedUserBorrowUsd)}
                          / ${Math.round(Number(formatUnits(assets, wbtcDecimals)) * (combinedCF) * 100).toString()}
                        </p>
                      </div>
                      <progress value={
                        formattedUserBorrowUsd / Math.round(Number(formatUnits(assets, wbtcDecimals)) * (combinedCF) * 100)
                      } className="" id="borrowprogress" />
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
              <div className="text-black flex flex-row justify-between border-t-2 border-b-2 p-6 border-slate-300">
                <img src={Usdc} alt="usdc" className="size-8" />
                <p className="m-2 font-semibold">USDC</p>
                <div>
                  <form
                    onSubmit={submitMetaAccountApproval}
                    className="flex flex-col"
                  >

                    <div className="flex flex-col">
                      <input
                        name=" "
                        placeholder=" "
                        className="bg-white mb-2"
                      />
                    </div>
                    <input
                      name="amount"
                      placeholder="Approval amount"
                      required
                      className="bg-white mb-2"
                    />
                    <button
                      className="text-black border-2 shadow-md border-slate-300  hover:border-emerald-300"
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
                    <div className="flex flex-col">
                      <input
                        name=" "
                        placeholder=" "
                        className="bg-white mb-2"
                      />
                    </div>
                    <input name="amount" placeholder="Deposit Amount" className="bg-white mb-2" />
                    <button
                      className="text-black border-2 shadow-md border-slate-300 hover:border-emerald-300"
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
                    <div className="flex flex-col">
                      <input
                        name=" "
                        placeholder=" "
                        className="bg-white mb-2"
                      />
                    </div>
                    <input name="amount" placeholder="Withdraw Amount" className="bg-white mb-2" />
                    <button
                      className="text-black border-2 shadow-md border-slate-300  hover:border-emerald-300"
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
              <div className="text-black flex flex-row justify-between border-t-2 border-b-2 p-3 border-slate-200">

                <img src={wBTCLogo} alt="wbtc" className="size-8 mr-2" />
                <p className="mr-2 font-semibold">WBTC</p>
                <div>
                  <form onSubmit={submitBorrow} className="flex flex-col">
                    <div className="flex flex-col">
                      <input
                        name="tokenBorrowAmount"
                        placeholder="Token Borrow Amount"
                        className="bg-white mb-2"
                      />
                      <input
                        name="creditBorrowAmount"
                        placeholder="Credit Borrow Amount"
                        className="bg-white mb-2"
                      />
                    </div>
                    <button
                      className="text-black border-2 shadow-md border-slate-300  hover:border-emerald-300"
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

