import { Outlet, ScrollRestoration } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

export default function Root () {
    return (
        <div className="bg-[#fffef6] relative min-h-screen pb-32 lg:pb-20">
            <ScrollRestoration/>
            <Header />
                <Outlet />
            <Footer />
        </div>
    );
}