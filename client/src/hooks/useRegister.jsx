import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../components/context/AuthContext";

export default function useRegister() {
    const [loading, setLoading] = useState(false);
    const { setCurrentUser } = useAuthContext();
    
    async function register({email, username, password, confirmPassword}) {
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:3000/api/auth/register", {
                email, username, password, confirmPassword});

            setCurrentUser({token: response.data.token, username: response.data.username});
            toast.success("Successfully registered account");
            
        } catch (error) {
            setLoading(false);
            if(error.response.data.error) {
                toast.error("Unable to register: " + error.response.data.error);
            } else {
                toast.error("Unable to register: " + error.response.data);
            }
        } finally {
            setLoading(false);
        }
    }

    return { loading, register };

}