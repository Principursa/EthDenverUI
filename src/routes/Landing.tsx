import React from "react";
import Splash from "../assets/splash.png";

import { Outlet, Link } from "react-router-dom";
function Landing() {
  return (
    <div className="h-screen w-screen bg-white flex flex-col items-center">
      <div className="">
        <ul className="h-20 flex  flex-row justify-evenly items-center visited:text-white ">
          <li>
            <Link
              to={`/app/vaults`}
              className="text-black hover:bg-green-300  hover:text-white text-xl font-bold  bg-white shadow-md box-border p-3 border-2 rounded-lg m-2 ease-in-out duration-500"
            >
               enTwyne yourself
            </Link>
          </li>
        </ul>
      </div>
      <img src={Splash} alt="splash" className="h-3/4" />
      <div className="text-black">
        <p>Twine is a non-custodial credit lending platform.</p>
        <p>We offer Margin provisioning and LTV optimization.</p>
      </div>
    </div>
  );
}

export default Landing;
