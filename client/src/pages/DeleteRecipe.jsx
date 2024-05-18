import { useEffect } from "react";
import { useAuthContext } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DeleteRecipe () {
    const { currentUser } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(!currentUser) navigate('/login');
    });

    //fetch post to delete
    //confirm user is poster
    //warn that this action is permanent and cannot be reversed.
    //submit delete action to server

    return (
        <section className="max-w-7xl flex flex-col items-center mx-auto p-8 lg:px-64 xl:px-36 2xl:px-8">
            <h1 className="text-default font-semibold text-2xl lg:text-3xl my-6 xl:px-16 text-center">
                Successfully deleted post.
            </h1>
        </section>
    );
}