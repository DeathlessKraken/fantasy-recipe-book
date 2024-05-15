import { Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Root () {
    return (
        <>
            <Sidebar />
            <div className="bg-[#fffef6] relative min-h-screen pb-[6rem] overflow-x-hidden">
                <ScrollRestoration/>
                <Toaster
                  position="top-center"
                  reverseOrder={false}
                  gutter={8}
                  containerStyle={{ marginTop: '4.5rem' }}
                  toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                
                    // Default options for specific types
                    success: {
                      duration: 3000,
                      theme: {
                        primary: 'green',
                        secondary: 'black',
                      },
                    },
                  }}
                />
                <Header />
                    <Outlet />
                <Footer />
            </div>
        </>
    );
}