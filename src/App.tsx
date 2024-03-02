import "./App.css";
import { Outlet, Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

function App() {
  return (
    <div className="h-screen w-screen bg-white">
      <div className="bg-white">
        <ul className="h-10 flex border-b-4 border-slate-300  flex-row justify-evenly items-center visited:text-white p-b-2">
          <li className="text-black">
            <Link
              to={"/"}
              className="text-black hover:text-emerald-300 text-m font-bold m-2"
            >
              Twyne
            </Link>
          </li>
          <li>
            <Link
              to={`markets`}
              className="text-black hover:text-emerald-300 text-m "
            >
              Lending Markets
            </Link>
          </li>

          <li className="">
            <Link
              to={`vaults`}
              className="text-black hover:text-emerald-300 text-m m-2"
            >
              Credit Vaults
            </Link>
          </li>

          <li className="mb-4">
            <ConnectButton/>
          </li>
        </ul>
      </div>
      <div className="flex flex-row justify-items justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
