import Search from "./Search";
import Avatar from "./Avatar";

import FFLogo from "../assets/FF_Logo.svg";

export default function Header () {
    return (
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-orange-100">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost text-slate-950">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div> 
            <div className="flex-1 px-2 mx-2 justify-end lg:hidden">
                <Avatar />
            </div>
            <div className="flex-none hidden lg:block w-full">
              <ul className="menu menu-horizontal p-0 m-0 w-full items-center justify-between">
                {/* Navbar menu content here */}
                <li className="p-0 justify-center"><img src={FFLogo} alt="Logo of fantasy foods" className="w-24"/></li>
                <li className="justify-center"><Search /></li>
                <li><Avatar /></li>
              </ul>
            </div>
          </div>
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 min-h-full bg-[#fffef6] text-default">
            {/* Sidebar content here */}
            <img src={FFLogo} alt="Logo of fantasy foods" className="h-24 w-24 mb-4"/>
            <li className="my-2"><a>Sidebar Item 1</a></li>
            <li className="my-2"><a>Sidebar Item 2</a></li>
          </ul>
        </div>
      </div>
    );
}