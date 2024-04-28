import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//Pages
import "./style.css";
import Root from "./components/Root";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Register, { registerAction } from "./pages/Register";
import Login, { loginAction } from "./pages/Login";

/*
Home page - browse recipes
See specific recipe
See specific user
See specific users recipe posts
Search all recipe posts and users
Create recipe post
Edit recipe post
Delete recipe post
Register account
Login to account
Logout of account
*/

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "recipe/:id", element: <Recipe /> },
            //{ path: "user/:id", element: <User /> },
            //{ path: "user/:id/recipes", element: <UserPosts /> },
            //{ path: "search/:query", element: <SearchContent /> },
            //{ path: "create", element: <CreateRecipe /> },
            //{ path: "recipe/:id/edit", element: <EditRecipe /> },
            //{ path: "recipe/:id/delete", element: <DeleteRecipe /> },
            { path: "register", element: <Register />, action: registerAction },
            { path: "login", element: <Login />, action: loginAction },
            //{ path: "logout", element: <Logout /> },
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
)  
