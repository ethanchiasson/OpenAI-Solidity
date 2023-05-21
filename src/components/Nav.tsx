import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "~/utils/api";

import { IoSparklesSharp} from "react-icons/io5";
import {GiRoundBottomFlask, GiStarSwirl} from "react-icons/gi"
import {FaHeart, FaGem, FaFire} from "react-icons/fa"
import {TiFlash, TiTicket} from "react-icons/ti"

import { useBuyCredits } from "../hooks/useBuyCredits";


const Navbar: React.FC = () => {
  const { data: sessionData } = useSession();
  const { buyCredits } = useBuyCredits();

  const credits = api.user.getCredits.useQuery(undefined, {});

  return (
    <div className="flex justify-center">

  
    <div className="navbar text-white p-2 max-w-5xl">
      <div className="flex-1">
        <Link
          href={"/"}
          className="btn-ghost btn rounded-md text-xl normal-case"
        >
          Pragma Lab 🧪
        </Link>
      </div>
      {sessionData ? (
        <div className="flex-none">
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn rounded-md p-2">
              <div className="indicator flex-row items-center justify-center">
                <IoSparklesSharp size={24} className="text-white" />
                <span className="p-2 text-sm tex-white">
                  {credits.data}
                </span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="card dropdown-content card-compact mt-3 w-52 bg-base-300 shadow"
            >
              <div className="card-body">
                {/* <span className="font-bold text-lg">8 Items</span>
          <span className="text-info">Subtotal: $999</span> */}
                <div className="card-actions">
                  <button
                    onClick={() => {
                      buyCredits().catch(console.error);
                    }}
                   className="btn-primary btn-block btn-sm rounded-md">
                    Buy Credits
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                {sessionData ? (
                  <img src={sessionData?.user.image?.toString()} />
                ) : (
                  "favicon.ico"
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-300 p-2 shadow"
            >
              <li>
                <Link href={"/"} className="justify-between">
                  Dashboard
                  {/* <span className="badge">New</span> */}
                </Link>
              </li>
              <li>
                <Link href={"/profile"} className="justify-between">
                  Profile
                  {/* <span className="badge">New</span> */}
                </Link>
              </li>
              {/* <li><a>Settings</a></li> */}
              <li>
                <a
                  onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                  }
                >
                  {sessionData ? "Sign out" : "Sign in"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button className="btn-sm btn-ghost rounded-md hover:font-bold">
          Sign In
        </button>
      )}
    </div>
    </div>
  );
};

export default Navbar;
