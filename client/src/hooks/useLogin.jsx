import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../components/context/AuthContext";

export default function useLogin() {
    const [loading, setLoading] = useState(false);
    const { setCurrentUser } = useAuthContext();
    
    async function login({username, password}) {
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", {username, password});

            setCurrentUser(response.data.token);
            
        } catch (error) {
            setLoading(false);
            toast.error("Unable to login: " + Object.values(error.response.data)[0]);
        } finally {
            setLoading(false);
        }
    }

    return { loading, login };

}