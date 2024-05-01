import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//Pages
import "./style.css";
import Root from "./components/Root";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Register from "./pages/Register";
import Login from "./pages/Login";
import User from "./pages/User";
import SearchContent from "./pages/SearchContent";
import Logout from "./pages/Logout";
import UpdateAccount from "./pages/UpdateAccount";
import Browse from "./pages/Browse";
import CreateRecipe from "./pages/CreateRecipe";

//Actions
import { registerAction } from "./utils/registerAction";
import { loginAction } from "./utils/loginAction";
import { updateAction } from "./utils/updateAction";

/*
Home page - browse recipes
See specific recipe
See specific user
See specific users recipe posts - see user profile page.
Search all recipe posts and users
Browse all recipes, by category (appetizer, dessert, etc...) and tag
Create recipe post
Edit recipe post
Delete recipe post
Register account
Update user account information
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
            { path: "user/:id", element: <User /> },
            { path: "search", element: <SearchContent />},
            { path: "browse", element: <Browse /> },
            { path: "create", element: <CreateRecipe /> },
            //{ path: "recipe/:id/edit", element: <EditRecipe /> },
            //{ path: "recipe/:id/delete", element: <DeleteRecipe /> },
            { path: "register", element: <Register />, action: registerAction },
            { path: "user/:id/update", element: <UpdateAccount />, action: updateAction },
            { path: "login", element: <Login />, action: loginAction },
            { path: "logout", element: <Logout /> },
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
)  
