import Splash from "../assets/splash.png";

import {Link } from "react-router-dom";
function Landing() {
  return (
    <div className="h-screen w-screen bg-white flex flex-col items-center">
      <div className="">
        <ul className="h-20 flex  flex-row justify-evenly items-center visited:text-white ">
          <li>
            <Link
              to={`/app/vaults`}
              className="text-black hover:bg-emerald-200  hover:text-white text-xl font-bold  bg-white shadow-md box-border p-3 border-2 rounded-lg m-2 ease-in-out duration-500"
            >
               enTwyne Yourself
            </Link>
          </li>
        </ul>
      </div>
      <img src={Splash} alt="splash" className="h-3/4" />
      <div className="text-black mt-5">
        <h2 className="font-semibold">Twyne is a non-custodial credit lending platform.</h2>
        <h2 className="font-semibold">We offer Margin provisioning and LTV optimization.</h2>
      </div>
    </div>
  );
}

export default Landing;
