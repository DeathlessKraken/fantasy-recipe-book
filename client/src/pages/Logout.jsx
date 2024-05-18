import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../components/context/AuthContext";
import toast from "react-hot-toast";
import { useEffect } from "react";


export default function Logout () {
    const { setCurrentUser } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentUser(null);
        toast.success("Successfully logged out");
        navigate('/login');
    });

    return (
        <>
        </>
    );
}