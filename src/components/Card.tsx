import React from "react";
import { NumericFormat } from "react-number-format";

function Card(props) {
  return (
    <div className="m-2 rounded-lg">
      <ul className="flex flex-col">
        <div className="flex flex-row bg-slate-200 p-3">
          <li className="mr-4 text-xl text-black">{props.symbol}</li>
          <li className="text-l text-black">
            {Math.round(Number(props.apy) * 100 * 100) / 100}%
          </li>
          <li>
            <button className="mr-5 ml-5">Deposit</button>
            <button>Withdraw</button>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Card;
