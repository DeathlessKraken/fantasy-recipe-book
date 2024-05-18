import { Link } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

export default function Sidebar () {
    const { currentUser } = useAuthContext();

    return (
        <div className="w-fit fixed top-[6rem] z-10 min-h-screen hidden lg:flex">
            <ul className="menu p-4 w-full min-h-full text-default mt-10 flex flex-col gap-2">
            {/* Sidebar content here */}
            <Link to="/" className=" hover:bg-slate-400 rounded-md px-4"><li className="my-2 text-xl">Home</li></Link>
            <Link to="/browse" className=" hover:bg-slate-400 rounded-md px-4"><li className="my-2 text-xl">Browse Recipes</li></Link>
            <Link to={currentUser ? "/create/" : "/login/"} className="hover:bg-slate-400 rounded-md px-4"><li className="my-2 text-xl">Post a Recipe</li></Link>
            <Link to="/random" className="hidden hover:bg-slate-400 rounded-md px-4"><li className="my-2 text-xl">Random Recipe</li></Link>

            {/* 
            {isLoggedIn ? <Link to="/logout/" className="hover:bg-slate-400 rounded-md px-4"><li className="my-2 text-xl">Log Out</li></Link> :
              <>
                <Link to="/login/" className="hover:bg-slate-400 rounded-md px-4"><li className="my-2 text-xl">Log In</li></Link>
                <Link to="/register/" className="hover:bg-slate-400 rounded-md px-4"><li className="my-2 text-xl">Sign Up</li></Link>
              </>
            }
            */}

          </ul>
        </div>
    );
}