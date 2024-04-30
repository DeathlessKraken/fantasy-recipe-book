import { Outlet, ScrollRestoration } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Root () {
    return (
        <>
            <Sidebar />
            <div className="bg-[#fffef6] relative min-h-screen pb-[6rem] overflow-x-hidden">
                <ScrollRestoration/>
                <Header />
                    <Outlet />
                <Footer />
            </div>
        </>
    );
}